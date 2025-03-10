# Complex Tabs

**Plugin Type:** WordPress block editor (Gutenberg) - This plugin is designed exclusively for use with the WordPress block editor, Gutenberg.
**Contributors:** Cédric Moris Kelly  
**Tags:** gutenberg, block, tabs, golf, material-ui  
**Requires at least:** 6.0  
**Tested up to:** 6.7  
**Requires PHP:** 7.4  
**Stable tag:** 1.0.1b  
**License:** GPL-3.0-or-later  
**License URI:** [https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html)

## Description

This a beta version, some customization options has to be added.

Complex Tabs provides a feature-rich Gutenberg block for creating beautiful, responsive tab layouts for Golf courses content. Built with Material UI, this plugin offers a seamless editing experience with interactive tabs that work perfectly on both desktop and mobile devices.

### Key Features

- **Rich Tab Content** - Add titles, subtitles, and metadata to each tab
- **Interactive Interface** - Smooth tab transitions and responsive design
- **Media Integration** - Add images to each tab with lightbox preview on the frontend
- **Golf-Specific Data** - Built-in support for Tee distances with color-coded indicators:
  - White
  - Yellow
  - Blue
  - Red
  - Orange
- **Consistent Design** - Same appearance in both editor and frontend
- **Modern Architecture** - Built with React and seamlessly integrated with Gutenberg

### Use Cases

- Display hole-by-hole course information
- Create interactive course guides
- Showcase different course areas or facilities
- Present membership options or pricing tiers

## Installation

1. Upload the plugin files to the `/wp-content/plugins/complex-tabs` directory, or install the provided plugin zip through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the Gutenberg editor to add a "Complex Tabs" block to your page.
4. Configure tabs by adding content in the sidebar panel.

## Frequently Asked Questions

### Can I customize the tab colors and fonts?

For now, you can edit `./tailwind.config.js` (global styles) and `./src/components/ThemePalette.jsx` (Material UI styles).

Material UI theme customization documentation:  
[https://mui.com/material-ui/customization/default-theme/](https://mui.com/material-ui/customization/default-theme/)

### How many tabs can I add?

There is no set limit to the number of tabs you can create, though for usability we recommend keeping the number reasonable.

### Can I use this for non-golf related content?

Absolutely! While designed with golf courses in mind, Complex Tabs can be used for any content that benefits from a tabbed layout.

### Does it work with page builders like Elementor, Divi or VisualComposer?

No. Complex Tabs is built specifically for the native WordPress block editor, Gutenberg. It is not compatible with other page builders.

## Development

### Installation

Clone or download the repository and type at the root of the package:

```sh
npm install
```
or
```sh
yarn
```

You may use the following commands in the root of the package:

```sh
npm run build
```
Build the package for production.

```sh
npm run start
```
Build the package for development and watch.

```sh
npm run tailwind
```
Build tailwindcss output and watch.

```sh
npm run plugin-zip
```
Zip the plugin for distribution.

```sh
npm run format
npm run lint:css
npm run lint:js
```
Lint commands.

```sh
npm run packages-update
```
Update command.

## Changelog

### 1.0.0b

- Initial release

## Upgrade Notice

### 1.0.0b

Initial version of Complex Tabs.

## Developer Notes

This plugin uses:

- React for components
- Material UI for design elements
- WordPress Block API
- Tailwind CSS for utilities

For contribution guidelines, please see the GitHub repository.