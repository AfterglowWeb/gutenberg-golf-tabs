import { __ } from '@wordpress/i18n';
import { 
  useBlockProps, 
  InnerBlocks,
  RichText 
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function TabPanelEdit({ attributes, setAttributes, context }) {
  const { tabId } = attributes;
  const { 'complex-tabs/selectedTab': selectedTab } = context;
  
  // Get parent block's tab data
  const tabData = useSelect(select => {
    const { getBlock } = select('core/block-editor');
    const { getBlockParents, getBlocksByClientId } = select('core/block-editor');
    
    // Get the parent block
    const parentClientIds = getBlockParents(clientId);
    if (parentClientIds.length === 0) return null;
    
    const parentBlock = getBlocksByClientId(parentClientIds)[0];
    if (!parentBlock || !parentBlock.attributes.tabs) return null;
    
    // Get the tab data for this panel
    return parentBlock.attributes.tabs[tabId] || null;
  }, [tabId]);
  
  // This panel is only visible when it's the selected tab
  if (selectedTab !== tabId) {
    return (
      <div {...useBlockProps({
        className: 'tab-panel-inactive',
        style: { display: 'none' }
      })} />
    );
  }
  
  return (
    <div {...useBlockProps({ className: 'tab-panel-active' })}>
      <Paper sx={{ p: 3 }}>
        {/* Display tab content if available from parent */}
        {tabData && tabData.content && (
          <div className="tab-parent-content">
            <RichText.Content 
              tagName="div" 
              value={tabData.content} 
            />
          </div>
        )}
        
        {/* Display starts if available */}
        {tabData && tabData.starts && Object.values(tabData.starts).some(val => val > 0) && (
          <div className="tab-starts flex gap-2 my-3">
            {/* Your starts display code */}
          </div>
        )}
        
        {/* Inner blocks for additional content */}
        <div className="tab-panel-inner-blocks">
          <InnerBlocks
            allowedBlocks={['core/paragraph', 'core/heading', 'core/gallery', 'core/file', 'core/video']} 
          />
        </div>
      </Paper>
    </div>
  );
}