import shortId from "shortid";

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
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        // dummyPost, ...state.mainPosts 이렇게 앞에 추가해야 추가된 게시글이 위로 올라간다.
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        // dummyPost, ...state.mainPosts 이렇게 앞에 추가해야 추가된 게시글이 위로 올라간다.
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};
export default reducer;
