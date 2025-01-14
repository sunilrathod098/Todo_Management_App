import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos = [], updateTodo, deleteTodo }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Your Todos</h2>
            {todos.length === 0 ? (
                <p>No todos available. Add a new todo!</p>
            ) : (
                <div className="space-y-4">
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                            updateTodo={updateTodo}
                            deleteTodo={deleteTodo}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        // add other properties of todo if needed
    })).isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
