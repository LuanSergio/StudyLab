import { useEffect, useRef, useState } from "react";
import "./styles.css";

interface IPostList {
  list: Array<string>;
}

const InfiniteScroll = () => {
  const [postList, setPostList] = useState<IPostList>({
    list: ["1", "2", "3", "4"],
  });

  // Tracking on which page we currently are
  const [page, setPage] = useState(1);
  // Add loader reference
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    var options = {
      root: null, // The element that is used as the viewport.
      rootMargin: "20px", // Grow or shrink root element's bounding box
      threshold: 1.0, // Percentage of the target's visibility the observer's callback should be executed
    };
    // Initialize IntersectionObserver and attach
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader?.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    // Simulate adding new posts to Post List
    setTimeout(() => {
      const newList = ["A", "B", "C", "D"];

      setPostList((currentList: IPostList) => ({
        list: currentList.list.concat(newList),
      }));
    }, 500);
  }, [page]);

  // Handle what happens when user scrolls to Loading
  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  return (
    <div className="container">
      <div className="post-list">
        {postList.list.map((post: string, index: number) => {
          return (
            <div key={index} className="post">
              <h2> {post} </h2>
            </div>
          );
        })}
        <div className="loading" ref={loader}>
          <h2>Loading...</h2>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
