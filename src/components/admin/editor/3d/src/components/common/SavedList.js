import React, { Component } from 'react';
import { Spin, Input, Row, Col, Card } from 'antd';
import warning from 'warning';
import Icon from 'polestar-icons';

import Empty from './Empty';
import Scrollbar from './Scrollbar';
import { SceneDatabase } from '../../database';
import { UtilTools } from '../../tools';

class SavedList extends Component{
    state = {
        loading: true,
        scenes: [],
        searchScene: '',
    }

    componentDidMount() {
        this.getSceneList();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            this.getSceneList();
        }
    }

    /**
     * @description Get scene list
     */
     getSceneList = () => {
        this.setState({
            loading: true,
        });
        SceneDatabase.allDocs().then(response => {
            const scenes = response.rows.map(row => {
                const { doc } = row;
                return {
                    id: doc._id,
                    name: doc.name,
                    description: doc.description || '',
                    scene: doc.scene,
                    thumbnail: doc.thumbnail,
                } ;
            });
            this.setState({
                scenes,
                loading: false,
            });
        }).catch(error => {
            warning(true, error);
            this.setState({
                loading: false,
            });
        });
    }

    /**
     * @description Search scene
     * @param {string} searchScene
     */
     handleSearchScene = (searchScene) => {
        this.setState({
            searchScene,
        });
    }

    /**
     * @description Select the scene
     * @param {*} scene
     */
     handleSelectScene = (savedScene) => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(savedScene);
        }
    }

    /**
     * @description Render search
     * @returns {React.ReactNode}
     */
     renderSearch = () => {
        return (
            <div style={{ flex: 1 }}>
                <Input allowClear={true} placeholder="Search for scene..." onChange={e => this.handleSearchScene(e.target.value)} />
            </div>
        );
    }

    /**
     * @description Render card actions
     * @param {ISavedScene} scene
     * @returns
     */
    renderCardActions = (scene) => {
        return [
            <Icon
                key="download"
                name="download"
                onClick={e => {
                    e.stopPropagation();
                    UtilTools.saveString(scene.scene, scene.name);
                }}
            />,
            <Icon
                key="delete"
                name="trash"
                onClick={e => {
                    e.stopPropagation();
                    SceneDatabase.delete(scene.id)
                    .then(() => {
                        this.getSceneList();
                    });
                }}
            />
        ];
    }

    /**
     * @description Render scenes on card
     * @param {ISavedScene[]} scenes
     * @param {string} searchScene
     * @returns {React.ReactNode}
     */
     renderCardItems = (scenes, searchScene) => {
        const items = scenes
        .filter(scene => scene.name.toLowerCase().includes(searchScene.toLowerCase())
        || scene.description.toLowerCase().includes(searchScene.toLowerCase()));
        return (
            <Scrollbar>
                {
                    items.length ? (
                        <Row gutter={16} style={{ margin: 0 }}>
                            {
                                items.map(scene => {
                                    return (
                                        <Col key={scene.id} md={24} lg={12} xl={6} onClick={() => this.handleSelectScene(scene)}>
                                            <Card
                                                hoverable={true}
                                                style={{ marginBottom: 16 }}
                                                bodyStyle={{ height: 100 }}
                                                cover={<img src={scene.thumbnail} />}
                                                actions={this.renderCardActions(scene)}
                                            >
                                                <Card.Meta
                                                    title={scene.name}
                                                    description={scene.description}
                                                />
                                            </Card>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    ) : <Empty />
                }
            </Scrollbar>
        );
    }

    render() {
        const { loading, scenes, searchScene } = this.state;
        return (
            <Spin spinning={loading}>
                {
                    scenes.length ? (
                        <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', padding: '0 8px 16px 8px' }}>
                                {this.renderSearch()}
                            </div>
                            <div style={{ flex: 1 }}>
                                {this.renderCardItems(scenes, searchScene)}
                            </div>
                        </div>
                    ) : <Empty />
                }
            </Spin>
        );
    }
}

export default SavedList;