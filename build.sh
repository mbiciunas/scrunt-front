# Remove the existing build directory
rm -rf ./dist

# Build the front end
npm run build

# Copy the build directory (dist) to scrunt-back
cp -rf ./dist ../scrunt-back

