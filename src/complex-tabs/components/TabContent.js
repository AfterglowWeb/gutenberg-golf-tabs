import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { memo } from '@wordpress/element';
import { 
    Paper
} from '@mui/material';

function CustomTabPanel({children, selectedTab, value, index}) {
      return (
        <div
          role="tabpanel"
          hidden={value !== selectedTab}
          id={value}
          aria-labelledby={`${index} ${value}`}
        >
          {value === selectedTab && <Paper sx={{ p: 3 }}>{children}</Paper>}
        </div>
      )
}

const TabContent = memo(function TabContent({ 
  tab, 
  index, 
  selectedTab,
  editingContent,
  setEditingContent,
  handleTabValueChange
}) {
  // Use local state for editing or fall back to stored content
  const content = editingContent !== null && editingContent.index === index 
    ? editingContent.content 
    : tab?.content || '';

  return (
    <CustomTabPanel 
      key={'panel-' + index} 
      selectedTab={selectedTab} 
      value={index} 
      index={index}
    >
      <div className="flex justify-between">
        <div>
          {tab.title && <p>{tab.title}</p>}
          {tab.subtitle && <p>{tab.subtitle}</p>}
        </div>
        <div>
          {tab.meta_1 && <p>{tab.meta_1}</p>}
          {tab.meta_2 && <p>{tab.meta_2}</p>}
        </div>
      </div>
    
      <div className="flex justify-start gap-4">
        <div className="w-1/2">
          <RichText
            tagName="p"
            placeholder={__('Écrivez ici.')}
            value={content}
            allowedFormats={['core/bold', 'core/italic']}
            onChange={(value) => {
              setEditingContent({
                index: index,
                content: value
              });
            }}
            onBlur={() => {
              if (editingContent && editingContent.index === index) {
                handleTabValueChange(editingContent.content, 'content', index);
                setEditingContent(null);
              }
            }}
          />
        </div>
        
        <div className="w-1/2 h-1/2">
          {tab.mediaUrl && (
            <img 
              src={tab.mediaUrl} 
              alt={tab.title} 
              className="w-full h-full object-cover" 
            />
          )}
        </div>
      </div>

      {tab.starts && 
        <div className="flex gap-2">
            {tab.starts.white && <span 
            className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-white"
            >{tab.starts.white}</span>}

            {tab.starts.yellow && <span 
            className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-yellow-400"
            >{tab.starts.yellow}</span>}

            {tab.starts.blue && <span 
            className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-blue-400"
            >{tab.starts.blue}</span>}

            {tab.starts.red && <span 
            className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-red-400"
            >{tab.starts.red}</span>}

            {tab.starts.orange && <span 
            className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-orange-400"
            >{tab.starts.orange}</span>}
        </div>}
    </CustomTabPanel>
  );
}, (prevProps, nextProps) => {
  // Custom comparison to optimize rerenders
  if (prevProps.selectedTab !== nextProps.selectedTab) return false;
  if (prevProps.index !== nextProps.index) return false;
  
  // Check if we're currently editing this content
  if (prevProps.editingContent?.index === prevProps.index || 
      nextProps.editingContent?.index === nextProps.index) {
    return false;
  }
  
  // Otherwise, only update if the tab content has changed
  return prevProps.tab?.content === nextProps.tab?.content &&
         prevProps.tab?.mediaUrl === nextProps.tab?.mediaUrl;
});

export default TabContent;