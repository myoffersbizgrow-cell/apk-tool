#!/usr/bin/env bash
# exit on error
set -o errexit

echo "📦 Starting Render build process..."

# Update package list
apt-get update

# Install Java (OpenJDK 17)
echo "☕ Installing Java..."
apt-get install -y openjdk-17-jre wget unzip

# Check Java installation
java -version

# Download Android tools
echo "🔧 Downloading Android tools..."
mkdir -p tools
cd tools

# Download APKTool
echo "📦 Downloading APKTool..."
wget -q https://raw.githubusercontent.com/iBotPeaches/Apktool/master/scripts/linux/apktool
chmod +x apktool

# Download AAPT2 (Linux version)
echo "📦 Downloading AAPT2..."
wget -q https://dl.google.com/dl/android/maven2/com/android/tools/build/aapt2/7.1.0-7984345/aapt2-7.1.0-7984345-linux.zip
unzip -q aapt2-7.1.0-7984345-linux.zip
chmod +x aapt2

# Download Bundletool
echo "📦 Downloading Bundletool..."
wget -q https://github.com/google/bundletool/releases/download/1.16.1/bundletool-all-1.16.1.jar
mv bundletool-all-1.16.1.jar bundletool.jar

# Download Android.jar (from public mirror - use with caution)
echo "📦 Downloading android.jar..."
wget -q https://github.com/airwire/android-platforms/raw/main/android-33.jar
mv android-33.jar android.jar

# Go back to project root
cd ..

# Verify tools
echo "✅ Tools downloaded:"
ls -la tools/

# Install Node dependencies
echo "📦 Installing Node dependencies..."
npm install

echo "🎉 Build completed successfully!"
