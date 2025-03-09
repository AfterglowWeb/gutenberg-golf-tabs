import { createRoot } from '@wordpress/element';
import FrontendTabs from './components/FrontendTabs';
import ThemePalette from './components/ThemePalette';

function initializeReactComponents() {
  const complexTabsBlocks = document.querySelectorAll('.complex-tabs-block');
  
  complexTabsBlocks.forEach(blockElement => {

    if (complexTabsData) {
      try {
        //const blockData = JSON.parse(complexTabsData);
        const reactContainer = document.createElement('div');
        reactContainer.className = 'complex-tabs-react-container';

        blockElement.innerHTML = '';
        blockElement.appendChild(reactContainer);


        const root = createRoot(reactContainer);
        root.render(
            <ThemePalette>
            <FrontendTabs blockData={complexTabsData} />
            </ThemePalette>
        )
      } catch (error) {
        console.error('Error initializing Complex Tabs React component:', error);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeReactComponents);