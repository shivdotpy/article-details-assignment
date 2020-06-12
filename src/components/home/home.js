import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { getUserFeed, getGlobalFeed, getTagList, getTagData } from '../../store/actions/articleActions';
import { Tabs } from "antd";
import '../home/home.css';
import ReactPaginate from 'react-paginate';
import RenderTab from "./renderTab";

const { TabPane } = Tabs;
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('AuthToken'),
            offset: 0,
            perPage: 10,
            currentPage: 0,
            showTag: true,
            tagName: '',
            activeTab: "1"
        }
    }

    componentDidMount() {
        const { getTagList } = this.props;
        this.switchTabFn();
        getTagList();
    }

    /**
     * onPageClick method call to click on page
     * @param {event} event
     * should call getGlobalFeed
     */
    onPageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.props.getGlobalFeed({ limit: 10, offset: this.state.offset })
        });
    };

    /**
     * switchTabFn method call while navigating between tabs
     * @param {string} key
     */
    switchTabFn = (key) => {
        if ((!this.state.token && key === undefined) || key === "2") {
            this.props.getGlobalFeed({ limit: 10, offset: this.state.offset });
            this.setState({ showTag: false });
            this.setState({
                activeTab: '2'
            });
        }
        else if (key === "3") {
            this.setState({ showTag: true });
            this.setState({
                activeTab: '3'
            });
        }
        else {
            this.props.getUserFeed({ limit: 10, offset: this.state.offset })
            this.setState({ showTag: false });
            this.setState({
                activeTab: '1'
            });
        }
    };

    /**
     * clickOnTag method call while click on tags
     * @param {string} tag
     */
    clickOnTag = (tag) => {
        this.props.getTagData({ limit: 10, offset: this.state.offset, tag: tag })
        this.setState({ showTag: true });
        this.setState({ tagName: tag });
        this.switchTabFn("3")
    }

    render() {
        const { token, showTag, tagName } = this.state;
        const { UserArticles, GlobalArticles, TagList, TagData } = this.props;
        return (
            <div>
                <div className="banner">
                    <div className="container-home">
                        <div className="titleHomePage">
                            Feed App
                    </div>
                        <div className="descriptionBanner">A place to share knowledge.</div>
                    </div>

                </div>
                <div className="feed-container">
                    <div className="feed-tab">
                        <Tabs activeKey={this.state.activeTab} size="large" onChange={this.switchTabFn}>
                            {token ? (
                                <TabPane tab="Your Feed" key="1">
                                    {(UserArticles && UserArticles.length > 0) ? UserArticles.map((article, i) => {
                                        return (
                                            <div className="feed-item-container" key={i}>
                                                <RenderTab article={article} />
                                            </div>
                                        )
                                    }) : ("No articles live here yet.")
                                    }
                                </TabPane>) : ("")}
                            <TabPane tab="Global feed" key="2">
                                {(GlobalArticles && GlobalArticles.length > 0) ? GlobalArticles.map((article, i) => {
                                    return (
                                        <div className="feed-item-container" key={i}>
                                            <RenderTab article={article} />
                                        </div>
                                    )
                                }) : ("No articles live here yet.")
                                }
                            </TabPane>
                            <TabPane tab={showTag ? "#" + tagName : ''} key="3">
                                {(TagData && TagData.length > 0) ? TagData.map((article, i) => {
                                    return (
                                        <div className="feed-item-container" key={i}>
                                            <RenderTab article={article} />
                                        </div>
                                    )
                                }) : ("No articles live here yet.")
                                }
                            </TabPane>)
                        </Tabs>
                        < ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={20}
                            onPageChange={this.onPageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>
                    <div className="feed-tag">
                        <div className="tag-title">Popular Tags</div>
                        <div style={{ marginTop: 10 }}>
                            {(TagList && TagList.length > 0) && TagList.map((tags, i) => {
                                return (
                                    <Link to="" key={tags} onClick={() => this.clickOnTag(tags)} className="tag-item">{tags}</Link>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        UserArticles: state.Articles.userArticles,
        GlobalArticles: state.Articles.globalArticles,
        TagList: state.Articles.tagList,
        TagData: state.Articles.tagData
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators({
        getUserFeed,
        getGlobalFeed,
        getTagData,
        getTagList
    },
        dispatch),
});
//connect : This function connects a React component to a Redux store.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
