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
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjBfMzkg%2FMDAxNjYwOTc5NjcwMjgw.JwRBsGD1CP6bUmEAzZF5Kn85oDMMjpOw9ClH_yryGxQg.sWTAlfiXe7kKaW5SKtsXzc2mjnuLRAwglBWHqWhkHjUg.JPEG.mmo6007%2F458cdb01901bfa315eb2e71671c3e92e.jpg&type=sc960_832",
        },
        {
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMzFfMTMz%2FMDAxNjc1MTcxNjgyMzk2.zeYHmKUyUBhn2dqndmrSeL8_eDg4g35tP6oPIWk3YuEg.lxYzJMNrXURmKZAPO13PnkkQpda0raskf2eZM6vWL1sg.JPEG.kis2092%2F0A481C56-B29A-4C74-B474-AB519912AC66.jpeg&type=sc960_832",
        },
        {
          src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMjJfMjU5%2FMDAxNjcxNzE2ODczNjY0.gUer3J6J1_9y8m2CFt6upy7f-oYEAjQBXru6-YDTRy4g.mLrnTStgGf-iL3oIafKshYWSEZQGpV3hf-ZfePbe9nsg.JPEG.jenny276%2FIMG_1842.jpg&type=sc960_832",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "hey",
          },
          content: "개정판입니다.",
        },
        {
          User: {
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
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터",
  User: {
    id: 1,
    nickname: "editha",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        // dummyPost, ...state.mainPosts 이렇게 앞에 추가해야 추가된 게시글이 위로 올라간다.
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};
export default reducer;
