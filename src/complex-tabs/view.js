import { createRoot } from '@wordpress/element';
import FrontendTabs from './components/FrontendTabs';
import ThemePalette from './components/ThemePalette';
import { ParallaxProvider } from 'react-scroll-parallax';


renderComplexTabsBlock();

function renderComplexTabsBlock() {
    
    const complexTabsRoots = document.querySelectorAll('.complex-tabs-block');

    if(!complexTabsRoots) {
        return;
    }
    complexTabsRoots.forEach(complexTabsRoot => {
        const dataScript = complexTabsRoot.querySelector('.block-data');
        if(!dataScript) {
            return;
        }

        const attributes = JSON.parse(dataScript.textContent);
        if(attributes && complexTabsRoot) {
            const root = ReactDOM.createRoot(complexTabsRoot);
            root.render(
            <ThemePalette>
                <ParallaxProvider>
                    <FrontendTabs {...attributes} />
                </ParallaxProvider>
            </ThemePalette>
            )
        }
    }
    );
}