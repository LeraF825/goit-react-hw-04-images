import s from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button type="button" className={s.btnLoadMore} onClick={onClick}>
      <strong>Load More</strong>
      <div id={s.containerStars}>
        <div id={s.stars}></div>
      </div>

      <div id={s.glow}>
        <div className={s.circle}></div>
        <div className={s.circle}></div>
      </div>
    </button>
  );
};
