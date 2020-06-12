import React from 'react';
import '../userDetails/profileBanner.css';
import { getProfileData } from '../../../store/actions/profileActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFollowData } from '../../../store/actions/followActions';

class BannerUserName extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: ''
        }
    }

    componentDidMount() {
        const { getProfileData } = this.props;
        getProfileData({ username: this.props.props }).then(response => {
            this.setState({ profile: response.profile })
        }
        )
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ profile: nextProps.Profile })
    }

    /**
     * onFollowBtnClick call method when click on follow button
     * {string} username
     */
    onFollowBtnClick = (username) => {
        const { getFollowData } = this.props;
        getFollowData({ username: username })
    }

    render() {
        return (
            <div className="banner-username">
                <div className="container-username">
                    <div>
                        <img alt="" src={this.state?.profile.image} className="user-img" height="100px" width="100px" />
                        <div className="username-details">{this.state?.profile.username}</div>
                    </div>
                    <div>
                        <button className="username-banner-button" onClick={() => this.onFollowBtnClick(this.state?.profile.username)}>
                            Follow  {`${this.state?.profile.username}`}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Profile: state.ProfileData.profile,
        FollowData: state.FollowData.follow
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators({
        getProfileData,
        getFollowData
    },
        dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BannerUserName);
