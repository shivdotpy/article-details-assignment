import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { getClickFavouriteArticle } from '../../store/actions/articleActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class RenderTab extends React.Component {
    constructor(props) {
        super(props)
        this.favouriteBtnClick = this.favouriteBtnClick.bind(this);
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
        const { FavoriteClickArticles } = this.props;
        return (
            <div>
                <div className="feed-item" >
                    <div className="feed-user-detail">
                        <div>
                            <Link to={`/username/${this.props.article.author.username}`} ><img alt="" src={this.props.article.author.image} className="feed-user-detail-img" height="32px" width="32px" /></Link>
                        </div>
                        <div className="feed-username-date">
                            <div className="feed-username">
                                <Link to={`/username/${this.props.article.author.username}`} className="username-link">{this.props.article.author.username}</Link>
                            </div>
                            <span className="feed-item-date">{new Date(this.props.article.createdAt).toDateString()}</span>
                        </div>
                    </div>
                    <div className="feed-desc">
                        <div className="feed-desc-title">
                            <Link to={`/Details/${this.props.article.slug}`} className="title-link">{this.props.article.title}</Link>
                        </div>
                        <div className="feed-desc-info">
                            <Link to={`/Details/${this.props.article.slug}`} className="description-link"> {this.props.article.description}</Link>
                        </div>
                    </div>
                    <div className="feed-more">
                        <Link to={`/Details/${this.props.article.slug}`} className="description-link"> Read more...</Link></div>
                </div >
                <ul className="feed-tags">
                    {(this.props.article.tagList && this.props.article.tagList.length > 0) && this.props.article.tagList.map(tag => {
                        return (
                            <Link to={`/Details/${this.props.article.slug}`} key={tag} className="tag-default tag-pill tag-outline">{tag}</Link>
                        )
                    })}
                </ul>
                <div className="feed-favorite">
                    <button className="feed-favorite-btn" onClick={() => this.favouriteBtnClick(this.props.article.slug)}>
                        <i></i>{(FavoriteClickArticles && FavoriteClickArticles.favoritesCount) ? FavoriteClickArticles.favoritesCount : this.props.article.favoritesCount}
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        FavoriteClickArticles: state.Articles.getClickFavouriteArticles
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators({
        getClickFavouriteArticle
    },
        dispatch),
});
//connect : This function connects a React component to a Redux store.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RenderTab);