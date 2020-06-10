import React from 'react';
import '../userDetails/userDetails.css';
import BannerUserName from './profileBanner';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { getFavouriteArticle, getMyArticle } from '../../../store/actions/articleActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { TabPane } = Tabs;
class userDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { getFavouriteArticle, getMyArticle } = this.props;
        getFavouriteArticle({ favorited: this.props.match.params.author, limit: 20, offset: 0 });
        getMyArticle({ author: this.props.match.params.author, limit: 20, offset: 0 });
    }

    onTabChange = (key) => {
        console.log(key);
    }

    render() {
        const { FavouriteArticles, MyArticles } = this.props;
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
                                            <div className="username-favorite">
                                                <button> <i></i>{article.favoritesCount}</button>
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
                                            <div className="username-favorite">
                                                <button>
                                                    <i></i>{article.favoritesCount}
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
        MyArticles: state.Articles.myArticles
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators({
        getFavouriteArticle,
        getMyArticle
    },
        dispatch),
});

//connect : This function connects a React component to a Redux store.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(userDetails);