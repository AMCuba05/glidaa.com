import Editor from '@react-page/editor';
import "@react-page/editor/lib/index.css";

// plugin imports
import slate from '@react-page/plugins-slate';
import '@react-page/plugins-slate/lib/index.css';
import image from '@react-page/plugins-image';
import '@react-page/plugins-image/lib/index.css';

// Define which plugins we want to use.
const cellPlugins = [slate(), image];

return (
  // ....

  // for editing
  <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} />;

  // for displaying saved content
  <Editor cellPlugins={cellPlugins} value={value} readOnly />;

  // ....
);
