interface FileViewerPropsType {
  activeFile: string | undefined;
}

const FileViewer = ({ activeFile }: FileViewerPropsType) => {
  return (
    <div className='h-full w-full'>
      <iframe className='h-full w-full' src={activeFile}></iframe>
    </div>
  );
};

export default FileViewer;
