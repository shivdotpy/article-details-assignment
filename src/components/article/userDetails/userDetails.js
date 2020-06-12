import React from 'react';
import '../userDetails/userDetails.css';
import BannerUserName from './profileBanner';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { getFavouriteArticle, getMyArticle, getClickFavouriteArticle } from '../../../store/actions/articleActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { TabPane } = Tabs;
class userDetails extends React.Component {
    constructor(props) {
        super(props);
        this.favouriteBtnClick = this.favouriteBtnClick.bind(this);
    }

    componentDidMount() {
        const { getFavouriteArticle, getMyArticle } = this.props;
        getFavouriteArticle({ favorited: this.props.match.params.author, limit: 20, offset: 0 });
        getMyArticle({ author: this.props.match.params.author, limit: 20, offset: 0 });
    }

    /**
     * onTabChange should call while navigating between tabs
     * {string} key
     */
    onTabChange = (key) => {
        console.log(key);
    }

    /**
     * favouriteBtnClick method call to click on favourite button
     * @param {string} slugData
     * should call getClickFavouriteArticle method with methodType post/delete evaluate by condition
     */
    favouriteBtnClick(slugData) {
        const { getClickFavouriteArticle } = this.props;
        if (this.props.FavoriteClickArticles.favorited) {
            getClickFavouriteArticle({ slug: slugData, methodType: "DELETE" });
        } else {
            getClickFavouriteArticle({ slug: slugData, methodType: "POST" });
        }
    }

    render() {
        const { FavouriteArticles, MyArticles, FavoriteClickArticles } = this.props;
        return (
            <div>
                {/*Call Banner username component & pass props */}
                <BannerUserName props={this.props.match.params.author} />
                <div className="username-container-details">
                    <div className="username-tab">
                        <Tabs defaultActiveKey="1" size="large" onChange={this.onTabChange}>
                            <TabPane tab="My Articles" key="1">
                                {(MyArticles && MyArticles.length > 0) && MyArticles.map((article, i) => {
                                    return (
                                        <div className="username-item-container" key={i}>
                                            <div className="username-item">
                                                <div className="username-detail">
                                                    <div>
                                                        <img alt="" src={article.author.image} className="username-detail-img" height="32px" width="32px" />
                                                    </div>
                                                    <div className="username-date">
                                                        <div className="username-details-username">
                                                            <Link to={`/username/${article.author.username}`} className="username-my-link">{article.author.username}</Link>
                                                        </div>
                                                        <span className="username-item-date">{new Date(article.createdAt).toDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="username-desc">
                                                    <div className="username-desc-title">
                                                        <Link to={`/Details/${article.slug}`} className="title-link">{article.title}</Link>
                                                    </div>
                                                    <div className="username-desc-info">
                                                        <Link to={`/Details/${article.slug}`} className="description-link">{article.description}</Link>
                                                    </div>
                                                </div>
                                                <div className="username-more">
                                                    <Link to={`/Details/${article.slug}`} className="description-link">Read more...</Link>
                                                </div>
                                            </div>
                                            <ul className="feed-tags">
                                                {(article.tagList && article.tagList.length > 0) && article.tagList.map(tag => {
                                                    return (
                                                        <Link to={`/Details/${article.slug}`} className="tag-default tag-pill tag-outline" key={tag}>{tag}</Link>
                                                    )
                                                })}
                                            </ul>
                                            <div className="feed-favorite">
                                                <button className="feed-favorite-btn" onClick={() => this.favouriteBtnClick(article.slug)}>
                                                    <i></i>{(FavoriteClickArticles && FavoriteClickArticles.favoritesCount) ? FavoriteClickArticles.favoritesCount : article.favoritesCount}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </TabPane>
                            <TabPane tab="Favorited Articles" key="2">
                                {(FavouriteArticles && FavouriteArticles.length > 0) && FavouriteArticles.map((article, i) => {
                                    return (
                                        <div className="username-item-container" key={i}>
                                            <div className="username-item">
                                                <div className="username-detail">
                                                    <div>
                                                        <img alt="" src={article.author.image} className="username-detail-img" height="32px" width="32px" />
                                                    </div>
                                                    <div className="username-date">
                                                        <div className="username-details-username">
                                                            <Link to={`/username/${article.author.username}`} className="username-my-link">{article.author.username}</Link>
                                                        </div>
                                                        <span className="username-item-date">{new Date(article.createdAt).toDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="username-desc">
                                                    <div className="username-desc-title">
                                                        <Link to={`/Details/${article.slug}`} className="title-link">{article.title}</Link>
                                                    </div>
                                                    <div className="username-desc-info">
                                                        <Link to={`/Details/${article.slug}`} className="description-link">{article.description}</Link>
                                                    </div>
                                                </div>
                                                <div className="username-more">
                                                    <Link to={`/Details/${article.slug}`} className="description-link">Read more...</Link>
                                                </div>
                                            </div>
                                            <ul className="feed-tags">
                                                {(article.tagList && article.tagList.length > 0) && article.tagList.map(tag => {
                                                    return (
                                                        <Link to={`/Details/${article.slug}`} className="tag-default tag-pill tag-outline" key={tag}>{tag}</Link>
                                                    )
                                                })}
                                            </ul>
                                            <div className="feed-favorite">
                                                <button className="feed-favorite-btn" onClick={() => this.favouriteBtnClick(article.slug)}>
                                                    <i></i>{(FavoriteClickArticles && FavoriteClickArticles.favoritesCount) ? FavoriteClickArticles.favoritesCount : article.favoritesCount}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        FavouriteArticles: state.Articles.favouriteArticles,
        MyArticles: state.Articles.myArticles,
        FavoriteClickArticles: state.Articles.getClickFavouriteArticles
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators({
        getFavouriteArticle,
        getClickFavouriteArticle,
        getMyArticle,
    },
        dispatch),
});

//connect : This function connects a React component to a Redux store.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(userDetails);