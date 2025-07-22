import { todoStatus } from "../../app/actions/todoActions";
import Button from "../ui/Button";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { todoType } from "../../types/todoType";
import clsx from "clsx";

const ChangeTodo = ({ todo }: { todo: todoType }) => {
    return (
        <form action={todoStatus} className="inline-block">
            <input name="inputId" value={todo.id} type="hidden" />
            <Button
                actionButton
                type="submit"
                text={
                    <AiOutlineCheckCircle
                        className={clsx(
                            "text-xl",
                            todo.isCompleted ? "text-green-600" : "text-white"
                        )}
                    />
                }
            />
        </form>
    );
};

export default ChangeTodo;
