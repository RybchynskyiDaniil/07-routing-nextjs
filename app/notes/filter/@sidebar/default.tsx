import css from "./NotesSidebar.module.css";
import Link from "next/link";
export default function Sidebar() {
  const noteTags = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
  return (
    <div>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>

        {noteTags.map((noteTag) => (
          <li key={noteTag} className={css.menuItem}>
            <Link href={`/notes/filter/${noteTag}`} className={css.menuLink}>
              {noteTag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
