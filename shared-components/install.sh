#!/bin/bash

# Simple script to copy navbar to your React apps
# Usage: ./install.sh /path/to/your/react/app

REACT_APP_PATH=$1

if [ -z "$REACT_APP_PATH" ]; then
    echo "Usage: ./install.sh /path/to/your/react/app"
    exit 1
fi

# Create shared components directory in target app
mkdir -p "$REACT_APP_PATH/src/components/shared"

# Copy navbar files
cp RepSpheresNavbar.jsx "$REACT_APP_PATH/src/components/shared/"
cp RepSpheresNavbar.css "$REACT_APP_PATH/src/components/shared/"

echo "✅ Navbar installed in $REACT_APP_PATH"
echo ""
echo "To use it, import in your App.js:"
echo "import RepSpheresNavbar from './components/shared/RepSpheresNavbar';"