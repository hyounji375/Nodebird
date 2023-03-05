import shortId from "shortid";
import produce from "immer";

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "editha",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          id: shortId.generate(),
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjBfMzkg%2FMDAxNjYwOTc5NjcwMjgw.JwRBsGD1CP6bUmEAzZF5Kn85oDMMjpOw9ClH_yryGxQg.sWTAlfiXe7kKaW5SKtsXzc2mjnuLRAwglBWHqWhkHjUg.JPEG.mmo6007%2F458cdb01901bfa315eb2e71671c3e92e.jpg&type=sc960_832",
        },
        {
          id: shortId.generate(),
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMzFfMTMz%2FMDAxNjc1MTcxNjgyMzk2.zeYHmKUyUBhn2dqndmrSeL8_eDg4g35tP6oPIWk3YuEg.lxYzJMNrXURmKZAPO13PnkkQpda0raskf2eZM6vWL1sg.JPEG.kis2092%2F0A481C56-B29A-4C74-B474-AB519912AC66.jpeg&type=sc960_832",
        },
        {
          id: shortId.generate(),
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMjJfMjU5%2FMDAxNjcxNzE2ODczNjY0.gUer3J6J1_9y8m2CFt6upy7f-oYEAjQBXru6-YDTRy4g.mLrnTStgGf-iL3oIafKshYWSEZQGpV3hf-ZfePbe9nsg.JPEG.jenny276%2FIMG_1842.jpg&type=sc960_832",
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "hey",
          },
          content: "개정판입니다.",
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "yeah",
          },
          content: "얼른 다 보고 싶어요.",
        },
      ],
    },
  ],
  // 게시글에서 이미지 업로드할 때 이미지들의 경로
  imagePaths: [],
  // 게시글 추가가 완료되었을 때 true로 바뀜
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

//액션을 그때 그때 실행해주는 동적 액션 크리에이터
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "editha",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "editha",
  },
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};
export default reducer;
