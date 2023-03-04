import PropTypes from "prop-types";
import Link from "next/link";

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
    // split으로 정규표현식을 사용할 때는 괄호를 써줘야 한다.
  );
};

PostCardContent.propTypes = { postData: PropTypes.string.isRequired };

export default PostCardContent;
