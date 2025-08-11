#!/usr/bin/env node

/**
 * Performance Analysis Tool for Universal Character Library
 * 
 * This script analyzes performance test results and provides insights and recommendations.
 */

const fs = require('fs');
const path = require('path');

class PerformanceAnalyzer {
    constructor(reportPath) {
        this.reportPath = reportPath;
        this.report = null;
        this.analysis = null;
    }

    loadReport() {
        try {
            const reportData = fs.readFileSync(this.reportPath, 'utf8');
            this.report = JSON.parse(reportData);
            console.log('✅ Performance report loaded successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to load performance report:', error.message);
            return false;
        }
    }

    analyze() {
        if (!this.report) {
            console.error('❌ No report loaded for analysis');
            return null;
        }

        this.analysis = {
            summary: this.generateSummary(),
            performance: this.analyzePerformance(),
            bottlenecks: this.identifyBottlenecks(),
            recommendations: this.generateRecommendations(),
            scalability: this.analyzeScalability(),
            memory: this.analyzeMemoryUsage()
        };

        return this.analysis;
    }

    generateSummary() {
        const { results, testConfig } = this.report;
        
        const totalTests = results.length;
        const datasetSizes = testConfig.datasetSizes;
        const largestDataset = Math.max(...datasetSizes);
        
        // Calculate overall statistics
        const loadTimes = results.filter(r => r.label && r.label.includes('load_'));
        const animationTimes = results.filter(r => r.animation);
        const customizationTimes = results.filter(r => r.customization);
        const filterTimes = results.filter(r => r.filter);
        
        return {
            totalTests,
            datasetSizes,
            largestDataset,
            testCategories: {
                loading: loadTimes.length,
                animations: animationTimes.length,
                customization: customizationTimes.length,
                filtering: filterTimes.length
            }
        };
    }

    analyzePerformance() {
        const { results, performance } = this.report;
        
        const analysis = {
            loading: {},
            animations: {},
            customization: {},
            filtering: {},
            overall: {}
        };

        // Analyze loading performance
        for (const size of this.report.testConfig.datasetSizes) {
            if (performance.loadTimes[size]) {
                const load = performance.loadTimes[size];
                analysis.loading[size] = {
                    averageMs: load.average,
                    maxMs: load.max,
                    minMs: load.min,
                    rating: this.ratePerformance(load.average, 'loading'),
                    timePerCharacter: load.average / size
                };
            }
        }

        // Analyze animation performance
        for (const [key, data] of Object.entries(performance.animationTimes)) {
            const [animation, size] = key.split('_');
            if (!analysis.animations[size]) {
                analysis.animations[size] = {};
            }
            
            analysis.animations[size][animation] = {
                averageMs: data.average,
                maxMs: data.max,
                minMs: data.min,
                rating: this.ratePerformance(data.average, 'animation')
            };
        }

        // Analyze customization performance
        const customResults = results.filter(r => r.customization);
        for (const size of this.report.testConfig.datasetSizes) {
            const sizeCustomResults = customResults.filter(r => r.characterCount === size);
            if (sizeCustomResults.length > 0) {
                const avgTime = sizeCustomResults.reduce((acc, r) => acc + r.duration, 0) / sizeCustomResults.length;
                analysis.customization[size] = {
                    averageMs: avgTime,
                    rating: this.ratePerformance(avgTime, 'customization'),
                    timePerCharacter: avgTime / size
                };
            }
        }

        // Analyze filtering performance
        const filterResults = results.filter(r => r.filter);
        for (const size of this.report.testConfig.datasetSizes) {
            const sizeFilterResults = filterResults.filter(r => r.characterCount === size);
            if (sizeFilterResults.length > 0) {
                const avgTime = sizeFilterResults.reduce((acc, r) => acc + r.duration, 0) / sizeFilterResults.length;
                analysis.filtering[size] = {
                    averageMs: avgTime,
                    rating: this.ratePerformance(avgTime, 'filtering'),
                    timePerCharacter: avgTime / size
                };
            }
        }

        // Overall performance rating
        const allRatings = [
            ...Object.values(analysis.loading).map(l => l.rating),
            ...Object.values(analysis.animations).flatMap(a => Object.values(a).map(v => v.rating)),
            ...Object.values(analysis.customization).map(c => c.rating),
            ...Object.values(analysis.filtering).map(f => f.rating)
        ];

        const avgRating = allRatings.reduce((acc, r) => {
            const ratingValue = r === 'excellent' ? 4 : r === 'good' ? 3 : r === 'fair' ? 2 : 1;
            return acc + ratingValue;
        }, 0) / allRatings.length;

        analysis.overall = {
            averageRating: avgRating,
            rating: this.getOverallRating(avgRating),
            testCount: allRatings.length
        };

        return analysis;
    }

    identifyBottlenecks() {
        const bottlenecks = [];
        const { performance } = this.report;

        // Check loading bottlenecks
        for (const [size, data] of Object.entries(performance.loadTimes)) {
            if (data.average > 1000) {
                bottlenecks.push({
                    type: 'loading',
                    severity: 'high',
                    description: `Slow loading for ${size} characters (${data.average.toFixed(2)}ms)`,
                    impact: 'User experience affected during initial load',
                    suggestion: 'Implement lazy loading or progressive loading'
                });
            }
        }

        // Check animation bottlenecks
        for (const [key, data] of Object.entries(performance.animationTimes)) {
            if (data.average > 50) {
                const [animation, size] = key.split('_');
                bottlenecks.push({
                    type: 'animation',
                    severity: data.average > 100 ? 'high' : 'medium',
                    description: `Slow ${animation} animation for ${size} characters (${data.average.toFixed(2)}ms)`,
                    impact: 'Animation playback may feel laggy',
                    suggestion: 'Optimize animation complexity or implement animation caching'
                });
            }
        }

        // Check memory bottlenecks
        for (const [size, data] of Object.entries(performance.memoryUsage)) {
            if (data.memoryUsageMB > 100) {
                bottlenecks.push({
                    type: 'memory',
                    severity: 'high',
                    description: `High memory usage for ${size} characters (${data.memoryUsageMB.toFixed(2)}MB)`,
                    impact: 'May cause memory issues on low-end devices',
                    suggestion: 'Implement memory pooling or object reuse'
                });
            }
        }

        // Check customization bottlenecks
        const customResults = this.report.results.filter(r => r.customization);
        for (const size of this.report.testConfig.datasetSizes) {
            const sizeCustomResults = customResults.filter(r => r.characterCount === size);
            if (sizeCustomResults.length > 0) {
                const avgTime = sizeCustomResults.reduce((acc, r) => acc + r.duration, 0) / sizeCustomResults.length;
                if (avgTime > 20) {
                    bottlenecks.push({
                        type: 'customization',
                        severity: 'medium',
                        description: `Slow customization for ${size} characters (${avgTime.toFixed(2)}ms)`,
                        impact: 'Customization may feel unresponsive',
                        suggestion: 'Optimize customization rendering or implement debouncing'
                    });
                }
            }
        }

        return bottlenecks;
    }

    generateRecommendations() {
        const { performance, testConfig } = this.report;
        const recommendations = [];

        // Loading recommendations
        const largestDataset = Math.max(...testConfig.datasetSizes);
        if (performance.loadTimes[largestDataset] && performance.loadTimes[largestDataset].average > 500) {
            recommendations.push({
                priority: 'high',
                category: 'loading',
                title: 'Implement Progressive Loading',
                description: 'Load characters in batches or on-demand to improve initial load time',
                implementation: 'Use virtual scrolling or pagination for large character sets'
            });
        }

        // Memory recommendations
        if (performance.memoryUsage[largestDataset] && performance.memoryUsage[largestDataset].memoryUsageMB > 50) {
            recommendations.push({
                priority: 'high',
                category: 'memory',
                title: 'Optimize Memory Usage',
                description: 'Reduce memory footprint through efficient data structures',
                implementation: 'Use object pooling, flyweight pattern, or data compression'
            });
        }

        // Animation recommendations
        const slowAnimations = Object.entries(performance.animationTimes)
            .filter(([key, data]) => data.average > 30)
            .map(([key]) => key.split('_')[0]);

        if (slowAnimations.length > 0) {
            recommendations.push({
                priority: 'medium',
                category: 'animation',
                title: 'Optimize Animation Performance',
                description: `Improve performance for ${slowAnimations.join(', ')} animations`,
                implementation: 'Use CSS transforms, reduce DOM manipulation, implement animation caching'
            });
        }

        // General optimization recommendations
        recommendations.push({
            priority: 'medium',
            category: 'general',
            title: 'Implement Performance Monitoring',
            description: 'Add real-time performance monitoring to detect issues early',
            implementation: 'Use Performance API, custom metrics, and alerting system'
        });

        recommendations.push({
            priority: 'low',
            category: 'general',
            title: 'Add Performance Budgets',
            description: 'Set and enforce performance budgets for different operations',
            implementation: 'Define time budgets for loading, animations, and user interactions'
        });

        return recommendations;
    }

    analyzeScalability() {
        const { performance, testConfig } = this.report;
        const scalability = {
            linear: true,
            maxRecommendedDataset: 0,
            performanceTrend: 'stable',
            projections: {}
        };

        const sizes = testConfig.datasetSizes.sort((a, b) => a - b);
        const loadTimes = sizes.map(size => performance.loadTimes[size]?.average || 0);
        
        // Check if performance scales linearly
        if (loadTimes.length > 1) {
            const ratios = [];
            for (let i = 1; i < loadTimes.length; i++) {
                const sizeRatio = sizes[i] / sizes[i - 1];
                const timeRatio = loadTimes[i] / loadTimes[i - 1];
                ratios.push(timeRatio / sizeRatio);
            }
            
            const avgRatio = ratios.reduce((acc, r) => acc + r, 0) / ratios.length;
            scalability.linear = avgRatio > 0.8 && avgRatio < 1.2;
            
            if (avgRatio > 1.2) {
                scalability.performanceTrend = 'degrading';
            } else if (avgRatio < 0.8) {
                scalability.performanceTrend = 'improving';
            }
        }

        // Find maximum recommended dataset size
        for (let i = sizes.length - 1; i >= 0; i--) {
            const size = sizes[i];
            const loadTime = performance.loadTimes[size]?.average || 0;
            const memoryUsage = performance.memoryUsage[size]?.memoryUsageMB || 0;
            
            if (loadTime < 2000 && memoryUsage < 200) {
                scalability.maxRecommendedDataset = size;
                break;
            }
        }

        // Project performance for larger datasets
        const largestSize = Math.max(...sizes);
        const largestLoadTime = performance.loadTimes[largestSize]?.average || 0;
        
        [10000, 20000, 50000, 100000].forEach(projectedSize => {
            const projectedLoadTime = (largestLoadTime / largestSize) * projectedSize;
            scalability.projections[projectedSize] = {
                estimatedLoadTimeMs: projectedLoadTime,
                feasible: projectedLoadTime < 5000,
                confidence: scalability.linear ? 'high' : 'medium'
            };
        });

        return scalability;
    }

    analyzeMemoryUsage() {
        const { performance, testConfig } = this.report;
        const memory = {
            patterns: {},
            efficiency: {},
            recommendations: []
        };

        const sizes = testConfig.datasetSizes;
        
        // Analyze memory patterns
        for (const size of sizes) {
            if (performance.memoryUsage[size]) {
                const data = performance.memoryUsage[size];
                memory.patterns[size] = {
                    totalMemoryMB: data.memoryUsageMB,
                    memoryPerCharacterKB: data.averageSizeKB,
                    efficiency: data.averageSizeKB < 10 ? 'excellent' : data.averageSizeKB < 20 ? 'good' : 'fair'
                };
            }
        }

        // Calculate memory efficiency
        const avgMemoryPerChar = Object.values(memory.patterns).reduce((acc, p) => acc + p.memoryPerCharacterKB, 0) / Object.values(memory.patterns).length;
        memory.efficiency = {
            averageMemoryPerCharacterKB: avgMemoryPerChar,
            rating: avgMemoryPerChar < 10 ? 'excellent' : avgMemoryPerChar < 20 ? 'good' : avgMemoryPerChar < 50 ? 'fair' : 'poor'
        };

        // Memory recommendations
        if (avgMemoryPerChar > 20) {
            memory.recommendations.push({
                priority: 'medium',
                title: 'Reduce Memory Per Character',
                description: 'Current memory usage per character is higher than optimal',
                suggestion: 'Use more efficient data structures, reduce property count, implement data compression'
            });
        }

        const largestMemory = Math.max(...Object.values(memory.patterns).map(p => p.totalMemoryMB));
        if (largestMemory > 100) {
            memory.recommendations.push({
                priority: 'high',
                title: 'Implement Memory Management',
                description: 'High memory usage detected for large datasets',
                suggestion: 'Use object pooling, lazy loading, or memory recycling'
            });
        }

        return memory;
    }

    ratePerformance(timeMs, type) {
        const thresholds = {
            loading: { excellent: 100, good: 500, fair: 1000 },
            animation: { excellent: 10, good: 30, fair: 50 },
            customization: { excellent: 5, good: 15, fair: 30 },
            filtering: { excellent: 5, good: 15, fair: 30 }
        };

        const threshold = thresholds[type] || thresholds.animation;
        
        if (timeMs <= threshold.excellent) return 'excellent';
        if (timeMs <= threshold.good) return 'good';
        if (timeMs <= threshold.fair) return 'fair';
        return 'poor';
    }

    getOverallRating(avgRating) {
        if (avgRating >= 3.5) return 'excellent';
        if (avgRating >= 2.5) return 'good';
        if (avgRating >= 1.5) return 'fair';
        return 'poor';
    }

    generateReport() {
        if (!this.analysis) {
            console.error('❌ No analysis available. Run analyze() first.');
            return null;
        }

        const report = {
            timestamp: new Date().toISOString(),
            summary: this.analysis.summary,
            performance: this.analysis.performance,
            bottlenecks: this.analysis.bottlenecks,
            recommendations: this.analysis.recommendations,
            scalability: this.analysis.scalability,
            memory: this.analysis.memory,
            overallAssessment: this.generateOverallAssessment()
        };

        // Save analysis report
        const analysisPath = path.join(path.dirname(this.reportPath), 'performance-analysis.json');
        fs.writeFileSync(analysisPath, JSON.stringify(report, null, 2));

        return report;
    }

    generateOverallAssessment() {
        const { performance, bottlenecks, recommendations, scalability, memory } = this.analysis;
        
        const highSeverityBottlenecks = bottlenecks.filter(b => b.severity === 'high').length;
        const highPriorityRecommendations = recommendations.filter(r => r.priority === 'high').length;
        const overallRating = performance.overall.rating;
        
        let assessment = {
            status: 'good',
            score: 0,
            summary: '',
            nextSteps: []
        };

        // Calculate score
        assessment.score = performance.overall.averageRating;
        
        // Determine status
        if (highSeverityBottlenecks === 0 && highPriorityRecommendations === 0 && overallRating === 'excellent') {
            assessment.status = 'excellent';
            assessment.summary = 'Performance is excellent with no critical issues detected.';
        } else if (highSeverityBottlenecks <= 1 && highPriorityRecommendations <= 2 && overallRating !== 'poor') {
            assessment.status = 'good';
            assessment.summary = 'Performance is good with minor optimization opportunities.';
        } else if (highSeverityBottlenecks <= 3 && highPriorityRecommendations <= 4) {
            assessment.status = 'fair';
            assessment.summary = 'Performance is acceptable but has areas that need improvement.';
        } else {
            assessment.status = 'poor';
            assessment.summary = 'Performance has significant issues that require immediate attention.';
        }

        // Generate next steps
        if (highSeverityBottlenecks > 0) {
            assessment.nextSteps.push('Address high-severity bottlenecks immediately');
        }
        
        if (highPriorityRecommendations > 0) {
            assessment.nextSteps.push('Implement high-priority recommendations');
        }
        
        if (scalability.performanceTrend === 'degrading') {
            assessment.nextSteps.push('Investigate and fix scalability issues');
        }
        
        if (memory.efficiency.rating === 'poor') {
            assessment.nextSteps.push('Optimize memory usage patterns');
        }
        
        assessment.nextSteps.push('Implement continuous performance monitoring');
        assessment.nextSteps.push('Set up performance regression testing');

        return assessment;
    }

    printSummary() {
        if (!this.analysis) {
            console.log('❌ No analysis available to display');
            return;
        }

        const { summary, performance, bottlenecks, recommendations, scalability, memory, overallAssessment } = this.analysis;

        console.log('\n📊 Performance Analysis Summary');
        console.log('============================');
        console.log(`Total Tests: ${summary.totalTests}`);
        console.log(`Dataset Sizes: ${summary.datasetSizes.join(', ')}`);
        console.log(`Largest Dataset: ${summary.largestDataset} characters`);
        console.log(`Overall Rating: ${performance.overall.rating.toUpperCase()} (${performance.overall.averageRating.toFixed(2)}/4.0)`);
        console.log(`Status: ${overallAssessment.status.toUpperCase()}`);
        console.log(`Score: ${overallAssessment.score.toFixed(2)}/4.0`);

        console.log('\n🎯 Performance by Category:');
        console.log('=========================');
        
        // Loading performance
        if (Object.keys(performance.loading).length > 0) {
            console.log('\nLoading Performance:');
            Object.entries(performance.loading).forEach(([size, data]) => {
                console.log(`  ${size} characters: ${data.averageMs.toFixed(2)}ms avg (${data.rating})`);
            });
        }

        // Memory usage
        if (Object.keys(memory.patterns).length > 0) {
            console.log('\nMemory Usage:');
            Object.entries(memory.patterns).forEach(([size, data]) => {
                console.log(`  ${size} characters: ${data.totalMemoryMB.toFixed(2)}MB total (${data.memoryPerCharacterKB.toFixed(2)}KB per char)`);
            });
        }

        // Bottlenecks
        if (bottlenecks.length > 0) {
            console.log('\n⚠️  Bottlenecks Detected:');
            console.log('====================');
            bottlenecks.forEach(bottleneck => {
                console.log(`  [${bottleneck.severity.toUpperCase()}] ${bottleneck.type}: ${bottleneck.description}`);
            });
        }

        // Recommendations
        if (recommendations.length > 0) {
            console.log('\n💡 Recommendations:');
            console.log('==================');
            recommendations.forEach((rec, index) => {
                console.log(`  ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.title}`);
                console.log(`     ${rec.description}`);
            });
        }

        // Scalability
        console.log('\n📈 Scalability Analysis:');
        console.log('======================');
        console.log(`Linear Scaling: ${scalability.linear ? '✅ Yes' : '❌ No'}`);
        console.log(`Performance Trend: ${scalability.performanceTrend}`);
        console.log(`Max Recommended Dataset: ${scalability.maxRecommendedDataset} characters`);
        
        console.log('\nProjections:');
        Object.entries(scalability.projections).forEach(([size, proj]) => {
            console.log(`  ${size} characters: ${proj.estimatedLoadTimeMs.toFixed(2)}ms (${proj.feasible ? '✅ Feasible' : '❌ Not feasible'})`);
        });

        // Overall assessment
        console.log('\n🎯 Overall Assessment:');
        console.log('====================');
        console.log(`Status: ${overallAssessment.status.toUpperCase()}`);
        console.log(`Summary: ${overallAssessment.summary}`);
        
        if (overallAssessment.nextSteps.length > 0) {
            console.log('\nNext Steps:');
            overallAssessment.nextSteps.forEach((step, index) => {
                console.log(`  ${index + 1}. ${step}`);
            });
        }
    }
}

// Main execution
function main() {
    const args = process.argv.slice(2);
    let reportPath = 'performance-report.json';
    let verbose = false;

    // Parse arguments
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--report' && i + 1 < args.length) {
            reportPath = args[i + 1];
            i++;
        } else if (args[i] === '--verbose') {
            verbose = true;
        } else if (args[i] === '--help') {
            console.log(`
Usage: node analyze-performance.js [options]

Options:
  --report <path>     Path to performance report JSON file (default: performance-report.json)
  --verbose           Enable verbose output
  --help              Show this help message

Examples:
  node analyze-performance.js
  node analyze-performance.js --report custom-report.json --verbose
            `);
            process.exit(0);
        }
    }

    console.log('🔍 Universal Character Library Performance Analyzer');
    console.log('=================================================');
    console.log(`Report file: ${reportPath}`);
    console.log(`Verbose mode: ${verbose}`);
    console.log('');

    const analyzer = new PerformanceAnalyzer(reportPath);
    
    if (!analyzer.loadReport()) {
        process.exit(1);
    }

    console.log('📊 Analyzing performance data...');
    const analysis = analyzer.analyze();
    
    if (!analysis) {
        console.error('❌ Analysis failed');
        process.exit(1);
    }

    console.log('✅ Analysis completed');
    
    if (verbose) {
        analyzer.printSummary();
    }

    const report = analyzer.generateReport();
    if (report) {
        console.log('\n📄 Analysis report saved: performance-analysis.json');
    }

    console.log('\n🎉 Performance analysis completed successfully!');
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error('❌ Performance analysis failed:', error);
        process.exit(1);
    });
}

module.exports = { PerformanceAnalyzer };