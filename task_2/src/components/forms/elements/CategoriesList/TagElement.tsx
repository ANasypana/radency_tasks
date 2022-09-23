// Core
import { FC } from 'react';
import cn from 'classnames';


interface IProps {
    setCategory: (category: string) => void;
    selectedCategory: string;
    name: string;
}


export const TagElement: FC<IProps> = (props) => {
    const { selectedCategory, setCategory, name } = props;

    const styles = cn('tag', {
        selected: selectedCategory === name,
        task:     name === 'Task',
        idea:     name === 'Idea',
        thought:  name === 'Random Thought',
    });

    const clickHandler = () => {
        setCategory(name);
    };

    return (
        <span
            className = { styles }
            onClick = { clickHandler } >
            { name }
        </span>
    );
};
