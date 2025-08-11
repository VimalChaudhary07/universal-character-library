#!/usr/bin/env node

/**
 * Performance Test Runner for Universal Character Library
 * 
 * This script runs comprehensive performance tests and generates detailed reports.
 */

const { runPerformanceTests } = require('./performance-test');

// Add command line argument parsing
const args = process.argv.slice(2);
const options = {
    datasetSizes: [100, 500, 1000, 2000, 5000],
    iterations: 10,
    output: 'performance-report.json',
    verbose: false
};

// Parse command line arguments
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--sizes' && i + 1 < args.length) {
        options.datasetSizes = args[i + 1].split(',').map(s => parseInt(s.trim()));
        i++;
    } else if (args[i] === '--iterations' && i + 1 < args.length) {
        options.iterations = parseInt(args[i + 1]);
        i++;
    } else if (args[i] === '--output' && i + 1 < args.length) {
        options.output = args[i + 1];
        i++;
    } else if (args[i] === '--verbose') {
        options.verbose = true;
    } else if (args[i] === '--help') {
        console.log(`
Usage: node run-performance-tests.js [options]

Options:
  --sizes <sizes>     Comma-separated list of dataset sizes (default: 100,500,1000,2000,5000)
  --iterations <n>    Number of test iterations (default: 10)
  --output <file>     Output file for performance report (default: performance-report.json)
  --verbose           Enable verbose logging
  --help              Show this help message

Examples:
  node run-performance-tests.js
  node run-performance-tests.js --sizes 100,1000,5000 --iterations 5
  node run-performance-tests.js --verbose --output custom-report.json
        `);
        process.exit(0);
    }
}

console.log('🚀 Universal Character Library Performance Test Runner');
console.log('================================================');
console.log(`Dataset sizes: ${options.datasetSizes.join(', ')}`);
console.log(`Iterations: ${options.iterations}`);
console.log(`Output file: ${options.output}`);
console.log(`Verbose mode: ${options.verbose}`);
console.log('');

// Run the performance tests
runPerformanceTests().catch(error => {
    console.error('❌ Performance tests failed:', error);
    process.exit(1);
});