import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { memo, useState } from '@wordpress/element';
import { Button, Fab, Paper, Dialog, DialogContent, DialogTitle, DialogActions} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function CustomTabPanel({children, selectedTab, value, index}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== selectedTab}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === selectedTab && <Paper sx={{ p: 3, backgroundColor:'oklch(0.968 0.007 247.896)' }} elevation={2}>{children}</Paper>}
    </div>
  );
}

const MemoizedRichText = memo(function RichTextEditor({
  content,
  index,
  editingContent,
  setEditingContent,
  handleTabValueChange
}) {
  return (
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
  );
}, (prevProps, nextProps) => {
  // Only re-render if content changed or editing status changed
  if (prevProps.content !== nextProps.content) return false;
  
  // Check editing status
  const prevEditing = prevProps.editingContent?.index === prevProps.index;
  const nextEditing = nextProps.editingContent?.index === nextProps.index;
  if (prevEditing !== nextEditing) return false;
  
  // If we're editing, always update
  if (nextEditing) return false;
  
  return true;
});

function TabContent({ 
  tab, 
  index, 
  selectedTab,
  editingContent,
  setEditingContent,
  handleTabValueChange
}) {

  const [open, setOpen] = useState(false);

  const content = editingContent !== null && editingContent.index === index 
    ? editingContent.content 
    : tab?.content || '';

  return (
    <CustomTabPanel 
      selectedTab={selectedTab} 
      value={index} 
      index={index}
    >
      <h3 className="flex justify-between pb-4">
        <span className="block">
          {tab.title && <span className="block text-xl font-bold">{tab.title}</span>}
          {tab.subtitle && <span className="block text-2xl text-secondary font-regular">{tab.subtitle}</span>}
        </span>
        <span className="block">
          {tab.meta_1 && <span className="block text-xl font-regular">{tab.meta_1}</span>}
          {tab.meta_2 && <span className="block text-xl leading-2xl font-regular">{tab.meta_2}</span>}
        </span>
      </h3>
    
      <div className="flex justify-start flex-wrap border-y border-slate-50">
        <div className="w-full md:w-1/2 p-2 flex flex-col gap-4 justify-between">
          <MemoizedRichText
            content={content}
            index={index}
            editingContent={editingContent}
            setEditingContent={setEditingContent}
            handleTabValueChange={handleTabValueChange}
          />
          <div>
            <h3 className="py-4">
              <span className="block text-lg font-bold">{__('Départs')}</span>
            </h3>
            {tab.starts && 
              <div className="flex gap-2 font-regular text-sm">
                {tab.starts.white > 0 && (
                  <span 
                    className="block w-10 p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-white"
                  >
                    {tab.starts.white}
                  </span>
                )}
                
                {tab.starts.yellow > 0 && (
                  <span 
                    className="block w-10 p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-yellow-400"
                  >
                    {tab.starts.yellow}
                  </span>
                )}
                
                {tab.starts.blue > 0 && (
                  <span 
                    className="block w-10 p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-blue-400"
                  >
                    {tab.starts.blue}
                  </span>
                )}
                
                {tab.starts.red > 0 && (
                  <span 
                    className="block w-10 p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-red-400"
                  >
                    {tab.starts.red}
                  </span>
                )}
                
                {tab.starts.orange > 0 && (
                  <span 
                    className="block w-10 p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-orange-400"
                  >
                    {tab.starts.orange}
                  </span>
                )}
              </div>
            }
          </div>
        </div>   
        <div className="w-full md:w-1/2 p-2">
            <div className="aspect-video">
            <div 
            className="relative cursor-pointer"
            onClick={() => setOpen(true)}
            >
              {tab.mediaUrl && (
                <img 
                  src={tab.mediaUrl} 
                  alt={tab.title || ''} 
                  className="aspect-video object-cover" 
                />
              )}
              <Fab 
                color="primary" 
                size="small"
                variant="extended"
                sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, textTransform:'capitalize'}}
              >
                {__('Détail')}
                <AddIcon />
              </Fab>
            </div>
            </div>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
            >
              <DialogTitle>{tab.title} {tab.subtitle}</DialogTitle>
              <DialogContent dividers>
                <img 
                  src={tab.mediaUrl} 
                  alt={tab.title || ''} 
                  className="max-h-[70svh] h-[70svh] w-auto object-contain"
                />
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)}>{__('Fermer')}</Button>
              </DialogActions>
            </Dialog>
        </div>
      </div>
    </CustomTabPanel>
  );
}

export default TabContent;