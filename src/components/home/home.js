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
        // this.favouriteBtnClick = this.favouriteBtnClick.bind(this);
    }

    componentDidMount() {
        const { getTagList } = this.props;
        this.switchTabFn();
        getTagList();
    }

    // favouriteBtnClick(slugData) {
    //     const { getClickFavouriteArticle } = this.props;
    //     getClickFavouriteArticle({ slug: slugData });
    // }

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

    switchTabFn = (key) => {
        if ((!this.state.token && key === undefined) || key === "2") {
            this.props.getGlobalFeed({ limit: 10, offset: this.state.offset });
            this.setState({ showTag: false });
            this.setState({
                activeTab: '2'
            });
        }
        else if (key === "3") {
            console.log("come")
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

    clickOnTag = (tag) => {
        this.props.getTagData({ limit: 10, offset: this.state.offset, tag: tag })
        this.setState({ showTag: true });
        this.setState({ tagName: tag });
        console.log(this.state.showTag);
        this.switchTabFn("3")
        console.log(tag);
    }

    render() {
        const { token, showTag, tagName } = this.state;
        const { UserArticles, GlobalArticles, TagList, TagData } = this.props;
        console.log("TagData", TagData)
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
                                                {/* <div className="feed-item">
                                                    <div className="feed-user-detail">
                                                        <div>
                                                            <Link to={`/username/${article.author.username}`} ><img alt="" src={article.author.image} className="feed-user-detail-img" height="32px" width="32px" /></Link>
                                                        </div>
                                                        <div className="feed-username-date">
                                                            <div className="feed-username">
                                                                <Link to={`/username/${article.author.username}`} className="username-link">{article.author.username}</Link></div>
                                                            <span className="feed-item-date">{new Date(article.createdAt).toDateString()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="feed-desc">
                                                        <div className="feed-desc-title">
                                                            <Link to={`/Details/${article.slug}`} className="title-link">{article.title}</Link>
                                                        </div>
                                                        <div className="feed-desc-info">
                                                            <Link to={`/Details/${article.slug}`} className="description-link">{article.description}</Link>
                                                        </div>
                                                    </div>
                                                    <div className="feed-more">
                                                        <Link to={`/Details/${article.slug}`} className="description-link">Read more...</Link>
                                                    </div>
                                                </div>
                                                <ul className="feed-tags">
                                                    {(article.tagList && article.tagList.length > 0) && article.tagList.map(tag => {
                                                        return (
                                                            <li className="tag-default tag-pill tag-outline" key={tag}>{tag}</li>
                                                        )
                                                    })}
                                                </ul>
                                                <div className="feed-favorite">
                                                    <button onClick={() => this.favouriteBtnClick(article.slug)}>
                                                        <i></i>{article.favoritesCount}
                                                    </button>
                                                </div> */}
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
                                            {/* <div className="feed-item">
                                                <div className="feed-user-detail">
                                                    <div>
                                                        <Link to={`/username/${article.author.username}`} ><img alt="" src={article.author.image} className="feed-user-detail-img" height="32px" width="32px" /></Link>
                                                    </div>
                                                    <div className="feed-username-date">
                                                        <div className="feed-username">
                                                            <Link to={`/username/${article.author.username}`} className="username-link">{article.author.username}</Link>
                                                        </div>
                                                        <span className="feed-item-date">{new Date(article.createdAt).toDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="feed-desc">
                                                    <div className="feed-desc-title">
                                                        <Link to={`/Details/${article.slug}`} className="title-link">{article.title}</Link>
                                                    </div>
                                                    <div className="feed-desc-info">
                                                        <Link to={`/Details/${article.slug}`} className="description-link"> {article.description}</Link>
                                                    </div>
                                                </div>
                                                <div className="feed-more">
                                                    <Link to={`/Details/${article.slug}`} className="description-link"> Read more...</Link></div>
                                            </div>
                                            <ul className="feed-tags">
                                                {(article.tagList && article.tagList.length > 0) && article.tagList.map(tag => {
                                                    return (
                                                        <li className="tag-default tag-pill tag-outline" key={tag}>{tag}</li>
                                                    )
                                                })}
                                            </ul>
                                            <div className="feed-favorite">
                                                <button onClick={() => this.favouriteBtnClick(article.slug)}>
                                                    <i></i>{article.favoritesCount}
                                                </button>
                                            </div> */}
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
                                            {/* <div className="feed-item">
                                                    <div className="feed-user-detail">
                                                        <div>
                                                            <Link to={`/username/${article.author.username}`} ><img alt="" src={article.author.image} className="feed-user-detail-img" height="32px" width="32px" /></Link>
                                                        </div>
                                                        <div className="feed-username-date">
                                                            <div className="feed-username">
                                                                <Link to={`/username/${article.author.username}`} className="username-link">{article.author.username}</Link>
                                                            </div>
                                                            <span className="feed-item-date">{new Date(article.createdAt).toDateString()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="feed-desc">
                                                        <div className="feed-desc-title">
                                                            <Link to={`/Details/${article.slug}`} className="title-link">{article.title}</Link>
                                                        </div>
                                                        <div className="feed-desc-info">
                                                            <Link to={`/Details/${article.slug}`} className="description-link"> {article.description}</Link>
                                                        </div>
                                                    </div>
                                                    <div className="feed-more">
                                                        <Link to={`/Details/${article.slug}`} className="description-link"> Read more...</Link></div>
                                                </div>
                                                <ul className="feed-tags">
                                                    {(article.tagList && article.tagList.length > 0) && article.tagList.map(tag => {
                                                        return (
                                                            <li className="tag-default tag-pill tag-outline" key={tag}>{tag}</li>
                                                        )
                                                    })}
                                                </ul>
                                                <div className="feed-favorite">
                                                    <button onClick={() => this.favouriteBtnClick(article.slug)}>
                                                        <i></i>{article.favoritesCount}
                                                    </button>
                                                </div> */}
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
        TagData: state.Articles.tagData,
        FavoriteClickArticles: state.Articles.getClickFavouriteArticles
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators({
        getUserFeed,
        getGlobalFeed,
        getTagData,
        getTagList
        // getClickFavouriteArticle
    },
        dispatch),
});
//connect : This function connects a React component to a Redux store.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
