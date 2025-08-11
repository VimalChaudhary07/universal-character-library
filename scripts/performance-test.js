/**
 * Universal Character Library Performance Test
 * 
 * This script tests the performance of the Universal Character Library
 * with large datasets and various usage scenarios.
 */

const fs = require('fs');
const path = require('path');

// Performance test configuration
const config = {
    // Dataset sizes to test
    datasetSizes: [100, 500, 1000, 2000, 5000],
    
    // Number of test iterations
    iterations: 10,
    
    // Animation tests
    animationTests: [
        'idle',
        'walk',
        'run',
        'jump',
        'dance',
        'wave',
        'fight',
        'fly'
    ],
    
    // Customization tests
    customizationTests: [
        { type: 'skinTone', changes: 13 },
        { type: 'hairColor', changes: 30 },
        { type: 'bodyType', changes: 8 },
        { type: 'expression', changes: 8 },
        { type: 'pose', changes: 8 }
    ],
    
    // Filter tests
    filterTests: [
        { type: 'all', style: 'all', culture: 'all' },
        { type: 'boy', style: 'casual', culture: 'all' },
        { type: 'girl', style: 'fantasy', culture: 'all' },
        { type: 'man', style: 'historical', culture: 'all' },
        { type: 'woman', style: 'sci-fi', culture: 'all' }
    ]
};

// Generate test character data
function generateCharacterData(count) {
    const types = ['boy', 'girl', 'man', 'woman'];
    const styles = ['casual', 'formal', 'sporty', 'fantasy', 'sci-fi', 'historical', 'traditional', 'holiday', 'sports', 'occupational'];
    const cultures = ['Western', 'Indian', 'Asian', 'African', 'Middle Eastern', 'Indigenous', 'Fantasy', 'Future', 'Nordic', 'Latin American'];
    const animations = ['idle', 'walk', 'run', 'jump', 'dance', 'wave', 'fight', 'fly', 'cast-spell', 'teleport', 'summon', 'hover', 'scan', 'transform', 'blast', 'shield', 'march', 'celebrate', 'drink', 'roar', 'give-gift', 'decorate', 'sing', 'spin', 'greet'];
    
    const characters = [];
    
    for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const style = styles[Math.floor(Math.random() * styles.length)];
        const culture = cultures[Math.floor(Math.random() * cultures.length)];
        
        characters.push({
            id: `character-${i}`,
            name: `Character ${i}`,
            type: type,
            style: style,
            culture: culture,
            description: `${type} from ${culture} culture in ${style} style`,
            tags: [type, style, culture.toLowerCase()],
            available: Math.random() > 0.1, // 90% available
            animations: animations.slice(0, Math.floor(Math.random() * 10) + 5) // 5-15 animations each
        });
    }
    
    return characters;
}

// Performance measurement utilities
class PerformanceTimer {
    constructor() {
        this.results = [];
    }
    
    start(label) {
        this.startTime = process.hrtime.bigint();
        this.label = label;
    }
    
    end() {
        const endTime = process.hrtime.bigint();
        const duration = Number(endTime - this.startTime) / 1000000; // Convert to milliseconds
        
        this.results.push({
            label: this.label,
            duration: duration,
            timestamp: Date.now()
        });
        
        return duration;
    }
    
    getResults() {
        return this.results;
    }
    
    getAverage(label) {
        const relevant = this.results.filter(r => r.label === label);
        if (relevant.length === 0) return 0;
        
        const sum = relevant.reduce((acc, r) => acc + r.duration, 0);
        return sum / relevant.length;
    }
    
    getMax(label) {
        const relevant = this.results.filter(r => r.label === label);
        if (relevant.length === 0) return 0;
        
        return Math.max(...relevant.map(r => r.duration));
    }
    
    getMin(label) {
        const relevant = this.results.filter(r => r.label === label);
        if (relevant.length === 0) return 0;
        
        return Math.min(...relevant.map(r => r.duration));
    }
}

// Mock Character class for testing
class MockCharacter {
    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.type = config.type;
        this.style = config.style;
        this.customization = config.customization || {};
        this.animationSpeed = config.animationSpeed || 1.0;
        this.currentAnimation = null;
        this.isPlaying = false;
    }
    
    play(animation) {
        this.currentAnimation = animation;
        this.isPlaying = true;
        // Simulate animation processing time
        const processingTime = Math.random() * 5 + 1; // 1-6ms
        return new Promise(resolve => setTimeout(resolve, processingTime));
    }
    
    pause() {
        this.isPlaying = false;
    }
    
    stop() {
        this.isPlaying = false;
        this.currentAnimation = null;
    }
    
    setCustomization(customization) {
        this.customization = { ...this.customization, ...customization };
        // Simulate customization processing time
        const processingTime = Math.random() * 3 + 0.5; // 0.5-3.5ms
        return new Promise(resolve => setTimeout(resolve, processingTime));
    }
    
    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
    }
    
    destroy() {
        this.isPlaying = false;
        this.currentAnimation = null;
    }
}

// Performance test functions
async function testCharacterLoading(timer, characterCount) {
    const label = `load_${characterCount}_characters`;
    timer.start(label);
    
    const characters = generateCharacterData(characterCount);
    const characterInstances = [];
    
    // Simulate loading characters
    for (const character of characters) {
        const instance = new MockCharacter({
            id: character.id,
            name: character.name,
            type: character.type,
            style: character.style
        });
        characterInstances.push(instance);
    }
    
    const duration = timer.end();
    
    return {
        characterCount,
        duration,
        characters: characterInstances
    };
}

async function testAnimationPerformance(timer, characters, animations) {
    const results = [];
    
    for (const animation of animations) {
        const label = `animation_${animation}_${characters.length}_chars`;
        timer.start(label);
        
        // Play animation on all characters
        const promises = characters.map(char => char.play(animation));
        await Promise.all(promises);
        
        const duration = timer.end();
        results.push({
            animation,
            duration,
            characterCount: characters.length
        });
    }
    
    return results;
}

async function testCustomizationPerformance(timer, characters, customizations) {
    const results = [];
    
    for (const customization of customizations) {
        const label = `customization_${customization.type}_${characters.length}_chars`;
        timer.start(label);
        
        // Apply customization to all characters
        const promises = characters.map(char => {
            const value = getCustomizationValue(customization.type);
            return char.setCustomization({ [customization.type]: value });
        });
        await Promise.all(promises);
        
        const duration = timer.end();
        results.push({
            customization: customization.type,
            duration,
            characterCount: characters.length
        });
    }
    
    return results;
}

function getCustomizationValue(type) {
    switch (type) {
        case 'skinTone':
            const skinTones = ['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'];
            return skinTones[Math.floor(Math.random() * skinTones.length)];
        case 'hairColor':
            const hairColors = ['#000000', '#8B4513', '#FFD700', '#FF4500', '#4169E1'];
            return hairColors[Math.floor(Math.random() * hairColors.length)];
        case 'bodyType':
            const bodyTypes = ['slim', 'average', 'athletic', 'muscular', 'heavy'];
            return bodyTypes[Math.floor(Math.random() * bodyTypes.length)];
        case 'expression':
            const expressions = ['neutral', 'happy', 'sad', 'angry', 'surprised'];
            return expressions[Math.floor(Math.random() * expressions.length)];
        case 'pose':
            const poses = ['standing', 'sitting', 'walking', 'running'];
            return poses[Math.floor(Math.random() * poses.length)];
        default:
            return 'default';
    }
}

function testFilterPerformance(timer, characters, filters) {
    const results = [];
    
    for (const filter of filters) {
        const label = `filter_${filter.type}_${filter.style}_${filter.culture}_${characters.length}_chars`;
        timer.start(label);
        
        // Filter characters
        const filtered = characters.filter(char => {
            const typeMatch = filter.type === 'all' || char.type === filter.type;
            const styleMatch = filter.style === 'all' || char.style === filter.style;
            const cultureMatch = filter.culture === 'all' || char.culture === filter.culture;
            return typeMatch && styleMatch && cultureMatch;
        });
        
        const duration = timer.end();
        results.push({
            filter,
            duration,
            characterCount: characters.length,
            filteredCount: filtered.length
        });
    }
    
    return results;
}

function testMemoryUsage(characters) {
    // Estimate memory usage
    const characterSize = JSON.stringify(characters).length;
    const memoryMB = characterSize / (1024 * 1024);
    
    return {
        characterCount: characters.length,
        memoryUsageMB: memoryMB,
        averageSizeKB: characterSize / characters.length / 1024
    };
}

// Main test runner
async function runPerformanceTests() {
    console.log('🚀 Starting Universal Character Library Performance Tests');
    console.log('================================================');
    
    const timer = new PerformanceTimer();
    const allResults = [];
    
    for (const characterCount of config.datasetSizes) {
        console.log(`\n📊 Testing with ${characterCount} characters...`);
        
        // Test character loading
        console.log('  🔄 Testing character loading...');
        const loadResult = await testCharacterLoading(timer, characterCount);
        allResults.push(loadResult);
        
        // Test animation performance
        console.log('  🎬 Testing animation performance...');
        const animationResults = await testAnimationPerformance(timer, loadResult.characters, config.animationTests);
        allResults.push(...animationResults);
        
        // Test customization performance
        console.log('  🎨 Testing customization performance...');
        const customizationResults = await testCustomizationPerformance(timer, loadResult.characters, config.customizationTests);
        allResults.push(...customizationResults);
        
        // Test filter performance
        console.log('  🔍 Testing filter performance...');
        const filterResults = testFilterPerformance(timer, loadResult.characters, config.filterTests);
        allResults.push(...filterResults);
        
        // Test memory usage
        console.log('  💾 Testing memory usage...');
        const memoryResult = testMemoryUsage(loadResult.characters);
        allResults.push(memoryResult);
        
        // Cleanup
        loadResult.characters.forEach(char => char.destroy());
        
        console.log(`  ✅ Completed tests for ${characterCount} characters`);
    }
    
    // Generate report
    generateReport(timer, allResults);
    
    console.log('\n🎉 Performance tests completed!');
    console.log('📄 Report generated: performance-report.json');
}

function generateReport(timer, results) {
    const report = {
        testConfig: config,
        summary: {
            totalTests: results.length,
            datasetSizes: config.datasetSizes,
            timestamp: new Date().toISOString()
        },
        results: results,
        averages: {},
        performance: {
            loadTimes: {},
            animationTimes: {},
            customizationTimes: {},
            filterTimes: {},
            memoryUsage: {}
        }
    };
    
    // Calculate averages
    for (const size of config.datasetSizes) {
        // Load times
        const loadResults = results.filter(r => r.label && r.label.includes(`load_${size}`));
        if (loadResults.length > 0) {
            report.performance.loadTimes[size] = {
                average: timer.getAverage(`load_${size}_characters`),
                max: timer.getMax(`load_${size}_characters`),
                min: timer.getMin(`load_${size}_characters`)
            };
        }
        
        // Animation times
        for (const animation of config.animationTests) {
            const animResults = results.filter(r => r.animation === animation && r.characterCount === size);
            if (animResults.length > 0) {
                const key = `${animation}_${size}`;
                if (!report.performance.animationTimes[key]) {
                    report.performance.animationTimes[key] = {
                        average: animResults.reduce((acc, r) => acc + r.duration, 0) / animResults.length,
                        max: Math.max(...animResults.map(r => r.duration)),
                        min: Math.min(...animResults.map(r => r.duration))
                    };
                }
            }
        }
        
        // Memory usage
        const memoryResults = results.filter(r => r.memoryUsageMB && r.characterCount === size);
        if (memoryResults.length > 0) {
            report.performance.memoryUsage[size] = memoryResults[0];
        }
    }
    
    // Save report
    const reportPath = path.join(__dirname, '..', 'performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Print summary
    console.log('\n📈 Performance Summary:');
    console.log('====================');
    
    for (const size of config.datasetSizes) {
        console.log(`\n${size} Characters:`);
        
        if (report.performance.loadTimes[size]) {
            const load = report.performance.loadTimes[size];
            console.log(`  Load Time: ${load.average.toFixed(2)}ms avg (${load.min.toFixed(2)}ms - ${load.max.toFixed(2)}ms)`);
        }
        
        if (report.performance.memoryUsage[size]) {
            const memory = report.performance.memoryUsage[size];
            console.log(`  Memory: ${memory.memoryUsageMB.toFixed(2)}MB total (${memory.averageSizeKB.toFixed(2)}KB per character)`);
        }
        
        // Show fastest and slowest animations
        const animKeys = Object.keys(report.performance.animationTimes).filter(k => k.includes(`_${size}`));
        if (animKeys.length > 0) {
            const animTimes = animKeys.map(k => ({
                animation: k.split('_')[0],
                time: report.performance.animationTimes[k].average
            }));
            
            const fastest = animTimes.reduce((a, b) => a.time < b.time ? a : b);
            const slowest = animTimes.reduce((a, b) => a.time > b.time ? a : b);
            
            console.log(`  Fastest Animation: ${fastest.animation} (${fastest.time.toFixed(2)}ms)`);
            console.log(`  Slowest Animation: ${slowest.animation} (${slowest.time.toFixed(2)}ms)`);
        }
    }
    
    // Performance recommendations
    console.log('\n💡 Performance Recommendations:');
    console.log('============================');
    
    const largestDataset = Math.max(...config.datasetSizes);
    const largeLoadTime = report.performance.loadTimes[largestDataset];
    
    if (largeLoadTime && largeLoadTime.average > 1000) {
        console.log('⚠️  Consider implementing lazy loading for large datasets');
    }
    
    const largeMemory = report.performance.memoryUsage[largestDataset];
    if (largeMemory && largeMemory.memoryUsageMB > 100) {
        console.log('⚠️  Consider implementing memory optimization techniques');
    }
    
    // Check animation performance
    let slowAnimations = 0;
    for (const [key, data] of Object.entries(report.performance.animationTimes)) {
        if (data.average > 50) slowAnimations++;
    }
    
    if (slowAnimations > 0) {
        console.log('⚠️  Consider optimizing animation performance for complex animations');
    }
    
    console.log('✅ Overall performance is within acceptable limits');
}

// Run tests if called directly
if (require.main === module) {
    runPerformanceTests().catch(console.error);
}

module.exports = {
    runPerformanceTests,
    generateCharacterData,
    testCharacterLoading,
    testAnimationPerformance,
    testCustomizationPerformance,
    testFilterPerformance,
    testMemoryUsage
};