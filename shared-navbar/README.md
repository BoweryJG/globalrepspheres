# RepSpheres Shared Navbar

## Simple Integration (No Monorepo Required)

### Method 1: Direct Copy
1. Copy the `RepSpheresNavbar.jsx` and `RepSpheresNavbar.css` files to each of your React apps
2. Place them in a `components/shared/` folder in each app
3. Import and use:

```jsx
import RepSpheresNavbar from './components/shared/RepSpheresNavbar';

function App() {
  return (
    <div>
      <RepSpheresNavbar 
        onLogin={() => console.log('Login clicked')}
        onSignup={() => console.log('Signup clicked')}
      />
      {/* Your app content */}
    </div>
  );
}
```

### Method 2: Git Submodule
1. Create a separate repo for the navbar component
2. In each React app, add it as a submodule:
```bash
git submodule add https://github.com/yourusername/repspheres-navbar.git src/components/shared/navbar
```

### Method 3: NPM Link (Local Development)
1. In the navbar folder:
```bash
npm init -y
npm link
```

2. In each React app:
```bash
npm link repspheres-navbar
```

### Method 4: Private NPM Package
1. Publish to npm as a private package
2. Install in each app:
```bash
npm install @yourorg/repspheres-navbar
```

### Method 5: GitHub Package Registry
1. Publish to GitHub Packages
2. Install using:
```bash
npm install @yourusername/repspheres-navbar
```