// When sending a request to the backend to get a sorted list of cats,
// for some reason some cats are repeated, which leads to the fact that if
// I use the native id of the cat object as a key for a component,
// I get a warning that components with the same id are being rendered.
// Because of this I use a library to generate my own keys for components,
// I understand that this is not the best solution,
// but I could not find a solution to this problem on the front-end side on my own.

import s from "./kittiesGallery.module.scss";
import KittieCard from "./KittieCard";
import { useSelector } from "react-redux/es/exports.js";
import {
  getAllKitties,
  getisLoading,
} from "../../redux/kitties/kitties-selectors";
import { createRef, useRef, useEffect } from "react";
import { loadMore } from "../../redux/kitties/kitties-slice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const KittiesGallery = () => {
  // const [uniqueKitties, setUniqueKitties] = useState([]);
  const dispatch = useDispatch();

  const lastKittie = createRef();
  const observerLoader = useRef();
  const KittiesGrid = useSelector(getAllKitties);
  const isLoading = useSelector(getisLoading);

  // useEffect(() => {
  //   setUniqueKitties([
  //     ...new Map(KittiesGrid.map((item) => [item["id"], item])).values(),
  //   ]);
  // }, [KittiesGrid]);

  useEffect(() => {
    const actionInSight = (entries) => {
      if (isLoading) {
        return;
      }
      if (entries[0].isIntersecting) {
        dispatch(loadMore());
      }
    };
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }

    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastKittie.current) {
      observerLoader.current.observe(lastKittie.current);
    }
  }, [lastKittie, isLoading, dispatch]);

  return (
    <div className="container">
      <ul className={s.ImageGallery}>
        {KittiesGrid.map((el, index) => {
          if (KittiesGrid.length === index + 1) {
            return (
              <KittieCard
                ref={lastKittie}
                key={uuidv4()}
                img={el.image_url}
                isAvailable={el.available}
                category={el.category}
                name={el.name}
                price={el.price}
              />
            );
          }
          return (
            <KittieCard
              key={uuidv4()}
              img={el.image_url}
              isAvailable={el.available}
              category={el.category}
              name={el.name}
              price={el.price}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default KittiesGallery;
