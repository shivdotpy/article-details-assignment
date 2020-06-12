import React, { useState, useEffect } from 'react';
import './addPost.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postNewArticleData, getSlugArticle, updateArticleData } from '../../store/actions/articleActions';

function AddPost(props) {
    const [articleForm, setarticleForm] = useState({
        title: '',
        articleAbout: '',
        description: '',
        tags: []
    })

    useEffect(() => {
        if (props.match?.params?.slug) {
            const { getSlugArticle, articleData } = props;
            getSlugArticle({ slug: props.match.params.slug }).then((response) => {
                let editableDataForEdit = response.article;
                let tagsToRender = [];
                if (editableDataForEdit?.tagList && editableDataForEdit.tagList.length > 0) {
                    editableDataForEdit.tagList.forEach(element => {
                        tagsToRender.push(element);
                    });
                }
                let renderableObject = {
                    title: editableDataForEdit.title,
                    articleAbout: editableDataForEdit.description,
                    description: editableDataForEdit.body,
                    tags: editableDataForEdit.tagList
                }
                setarticleForm(renderableObject);
            });
        }
    }, []);

    /**
     * publishArticle should call when to publishing article
     * @param {event} e 
     */
    const PublishArticle = (e) => {
        const { postNewArticleData, updateArticleData } = props;
        e.preventDefault();
        if (articleForm) {
            let tagList = [];
            tagList.push(articleForm.tags);
            let body = {
                "article": {
                    "title": articleForm.title,
                    "description": articleForm.description,
                    "body": articleForm.articleAbout,
                    "tagList": tagList
                }
            }
            if (body) {
                if (props.match?.params?.slug) {
                    updateArticleData({ slug: props.match?.params?.slug, article: body }).then(response => {
                        let slug = response.article.slug;
                        setarticleForm({
                            title: '',
                            articleAbout: '',
                            description: '',
                            tags: []
                        });
                        props.history.push(`/Details/${slug}`);
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    postNewArticleData({ article: body }).then(response => {
                        let slug = response.article.slug;
                        setarticleForm({
                            title: '',
                            articleAbout: '',
                            description: '',
                            tags: []
                        });
                        props.history.push(`/Details/${slug}`);
                    }).catch(error => {
                        console.log(error);
                    });
                }
            }
        }
    }

    /**
     * onValueChange should call when value changed
     * @param {event} e 
     */
    const onValueChange = (e) => {
        let tempVal = Object.assign({}, articleForm);
        let name = e.target.name;
        let value = e.target.value;
        tempVal[name] = value;
        setarticleForm(tempVal);
    }

    return (
        <div className="container">
            <form onSubmit={PublishArticle}>
                <div className="form-container">
                    <div className="form-group">
                        <input type="text" className="form-control article" name="title" value={articleForm.title} onChange={event => onValueChange(event, 'title')} placeholder="Article Title" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control article font-change" value={articleForm.articleAbout} name="articleAbout" onChange={event => onValueChange(event, 'articleAbout')} placeholder="What's this article about?" />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control article textarea" name="description" value={articleForm.description} rows="8" onChange={event => onValueChange(event, 'description')} placeholder="Write your article"></textarea>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control article font-change" name="tags" onChange={event => onValueChange(event, 'tags')} placeholder="Enter tags" />
                    </div>
                </div>
                <button type="submit" className="submit-btn" >Publish Article</button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        articleData: state.Articles.slugArticles,
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators({
        postNewArticleData,
        getSlugArticle,
        updateArticleData
    },
        dispatch),
});

//connect : This function connects a React component to a Redux store.
export default withRouter(connect(mapStateToProps,
    mapDispatchToProps)(AddPost));