import "./NotFoundPage.css"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
    return (
        <div>404 Запрошенная страница не найдена
            <Link to="/">Вернуться на главную</Link>
        </div>
    )
}