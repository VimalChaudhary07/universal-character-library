const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const babel = require('@rollup/plugin-babel');
const resolve = '@rollup/plugin-node-resolve';
const css = require('rollup-plugin-css-only');
const { terser } = require('rollup-plugin-terser');
const sass = require('sass');
const svgo = require('svgo');

// Build configuration
const isProduction = process.env.NODE_ENV === 'production';
const outputDir = path.resolve(__dirname, '../../src/lib/dist');

// Ensure output directories exist
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

ensureDir(path.join(outputDir, 'css'));
ensureDir(path.join(outputDir, 'js'));
ensureDir(path.join(outputDir, 'svg'));
ensureDir(path.join(outputDir, 'types'));

// SVGO configuration for SVG optimization
const svgoConfig = {
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeViewBox: false,
                    cleanupIDs: false
                }
            }
        },
        {
            name: 'addAttributesToSVGElement',
            params: {
                attributes: [
                    { 'focusable': 'false' },
                    { 'aria-hidden': 'true' }
                ]
            }
        }
    ]
};

// Process character files
const processCharacters = async () => {
    const charactersDir = path.resolve(__dirname, '../../src/characters');
    const characterTypes = ['boy', 'girl', 'man', 'woman'];
    
    console.log('Processing character files...');
    
    for (const type of characterTypes) {
        const typeDir = path.join(charactersDir, type);
        if (!fs.existsSync(typeDir)) continue;
        
        const characters = fs.readdirSync(typeDir);
        
        for (const character of characters) {
            const characterDir = path.join(typeDir, character);
            if (!fs.statSync(characterDir).isDirectory()) continue;
            
            await processCharacter(characterDir, character, type);
        }
    }
};

// Process individual character
const processCharacter = async (characterDir, characterName, characterType) => {
    console.log(`Processing ${characterType}/${characterName}...`);
    
    // Process SVG files
    const svgDir = path.join(characterDir, 'svg');
    if (fs.existsSync(svgDir)) {
        await processSVGFiles(svgDir, characterName, characterType);
    }
    
    // Process CSS files
    const cssFiles = [
        path.join(characterDir, 'animations.css'),
        path.join(characterDir, 'custom-properties.css')
    ];
    
    for (const cssFile of cssFiles) {
        if (fs.existsSync(cssFile)) {
            await processCSSFile(cssFile, characterName, characterType);
        }
    }
    
    // Process meta.json
    const metaFile = path.join(characterDir, 'meta.json');
    if (fs.existsSync(metaFile)) {
        await processMetaFile(metaFile, characterName, characterType);
    }
};

// Process SVG files
const processSVGFiles = async (svgDir, characterName, characterType) => {
    const svgFiles = fs.readdirSync(svgDir).filter(file => file.endsWith('.svg'));
    
    for (const svgFile of svgFiles) {
        const svgPath = path.join(svgDir, svgFile);
        const svgContent = fs.readFileSync(svgPath, 'utf8');
        
        // Optimize SVG with SVGO
        const optimizedSVG = await new Promise((resolve, reject) => {
            svgo.optimize(svgContent, svgoConfig, (result) => {
                if (result.error) {
                    reject(result.error);
                } else {
                    resolve(result.data);
                }
            });
        });
        
        // Copy to output directory
        const outputFileName = `${characterType}-${characterName}-${path.basename(svgFile, '.svg')}.svg`;
        const outputPath = path.join(outputDir, 'svg', outputFileName);
        fs.writeFileSync(outputPath, optimizedSVG);
    }
};

// Process CSS files
const processCSSFile = async (cssFile, characterName, characterType) => {
    const cssContent = fs.readFileSync(cssFile, 'utf8');
    const fileName = path.basename(cssFile, '.css');
    
    // Process SCSS if needed
    let processedCSS = cssContent;
    if (cssFile.endsWith('.scss')) {
        const result = sass.compile(cssFile);
        processedCSS = result.css;
    }
    
    // Add character-specific scope
    const scopedCSS = processedCSS.replace(
        /([^{]+){/g,
        `.character-${characterType}-${characterName} $1{`
    );
    
    const outputFileName = `${characterType}-${characterName}-${fileName}.css`;
    const outputPath = path.join(outputDir, 'css', outputFileName);
    fs.writeFileSync(outputPath, scopedCSS);
};

// Process meta.json files
const processMetaFile = async (metaFile, characterName, characterType) => {
    const metaContent = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
    
    // Add additional metadata
    const enhancedMeta = {
        ...metaContent,
        processed: {
            date: new Date().toISOString(),
            version: '1.0.0'
        }
    };
    
    const outputFileName = `${characterType}-${characterName}-meta.json`;
    const outputPath = path.join(outputDir, 'js', outputFileName);
    fs.writeFileSync(outputPath, JSON.stringify(enhancedMeta, null, 2));
};

// Build main library bundle
const buildLibraryBundle = async () => {
    console.log('Building main library bundle...');
    
    const bundle = await rollup.rollup({
        input: path.resolve(__dirname, '../../src/lib/index.js'),
        plugins: [
            resolve({
                browser: true
            }),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**',
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1%', 'last 2 versions']
                        }
                    }]
                ]
            }),
            css({
                output: path.join(outputDir, 'css', 'character-library.css')
            }),
            isProduction && terser()
        ].filter(Boolean)
    });
    
    // Write different bundle formats
    await bundle.write({
        file: path.join(outputDir, 'js', 'index.js'),
        format: 'cjs',
        sourcemap: !isProduction
    });
    
    await bundle.write({
        file: path.join(outputDir, 'js', 'index.esm.js'),
        format: 'esm',
        sourcemap: !isProduction
    });
    
    await bundle.write({
        file: path.join(outputDir, 'js', 'index.umd.js'),
        format: 'umd',
        name: 'CharacterLibrary',
        sourcemap: !isProduction
    });
    
    if (isProduction) {
        await bundle.write({
            file: path.join(outputDir, 'js', 'index.min.js'),
            format: 'umd',
            name: 'CharacterLibrary',
            plugins: [terser()],
            sourcemap: true
        });
    }
    
    await bundle.close();
};

// Generate library manifest
const generateManifest = async () => {
    console.log('Generating library manifest...');
    
    const charactersDir = path.resolve(__dirname, '../../src/characters');
    const manifest = {
        version: '1.0.0',
        buildDate: new Date().toISOString(),
        characters: [],
        animations: [],
        styles: []
    };
    
    const characterTypes = ['boy', 'girl', 'man', 'woman'];
    
    for (const type of characterTypes) {
        const typeDir = path.join(charactersDir, type);
        if (!fs.existsSync(typeDir)) continue;
        
        const characters = fs.readdirSync(typeDir);
        
        for (const character of characters) {
            const characterDir = path.join(typeDir, character);
            if (!fs.statSync(characterDir).isDirectory()) continue;
            
            const metaFile = path.join(characterDir, 'meta.json');
            if (fs.existsSync(metaFile)) {
                const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
                manifest.characters.push({
                    id: meta.id,
                    name: meta.name,
                    type: meta.type,
                    style: meta.style,
                    tags: meta.tags || []
                });
                
                if (meta.animations) {
                    manifest.animations.push(...meta.animations.map(anim => ({
                        character: meta.id,
                        name: anim.name,
                        duration: anim.duration,
                        type: anim.type
                    })));
                }
                
                if (meta.variants) {
                    manifest.styles.push(...meta.variants.map(variant => ({
                        character: meta.id,
                        name: variant.name
                    })));
                }
            }
        }
    }
    
    const manifestPath = path.join(outputDir, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
};

// Main build function
const build = async () => {
    console.log('Starting build process...');
    console.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
    
    try {
        await processCharacters();
        await buildLibraryBundle();
        await generateManifest();
        
        console.log('Build completed successfully!');
        console.log(`Output directory: ${outputDir}`);
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
};

// Run build
build();
