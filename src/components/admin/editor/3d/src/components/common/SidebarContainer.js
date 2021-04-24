import React from 'react';
import Scrollbar from './Scrollbar';
import { Spin } from 'antd';

const SidebarContainer = props => {
    const {
        style,
        title,
        titleStyle,
        content,
        contentStyle,
        children,
        spinning = false,
    } = props;
    return (
        <Spin spinning={spinning}>
            <div className="editor-setting-panel" style={style}>
                <div className="editor-setting-panel-title" style={titleStyle}>
                    {title}
                </div>
                <div className="editor-setting-panel-content" style={contentStyle}>
                    <Scrollbar>
                            {children || content}
                    </Scrollbar>
                </div>
            </div>
        </Spin>
    )
};

export default SidebarContainer;
