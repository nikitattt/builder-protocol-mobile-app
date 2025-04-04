const fs = require('fs');
const path = require('path');

const gradleFilesToPatch = [
  '../../../node_modules/react-native-tcp/android/build.gradle',
  '../../../node_modules/react-native-os/android/build.gradle',
  // Add other files that need patching
];

function patchGradleFile(gradleFilePath) {
  try {
    const fullPath = path.resolve(__dirname, gradleFilePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${fullPath}`);
      return;
    }

    // console.log(`Found Gradle file at: ${fullPath}`);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace all 'compile' with 'implementation' within dependencies blocks
    const newContent = content.replace(
      /(dependencies\s*\{[\s\S]*?\})/g,
      (match) => match.replace(/compile\s+/g, 'implementation ')
    );
    
    if (content !== newContent) {
      fs.writeFileSync(fullPath, newContent, 'utf8');
      console.log(`Successfully patched: ${gradleFilePath}`);
    } else {
      console.log(`No changes needed for: ${gradleFilePath}`);
    }
  } catch (error) {
    console.error(`Error patching ${gradleFilePath}:`, error);
  }
}

// Patch all specified files
gradleFilesToPatch.forEach(patchGradleFile);