import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { FC } from 'react';
import cn from 'classnames';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const getPersonLink = (name: string) => {
    const parent = people.find(person => person.name === name);

    if (!parent) {
      return name;
    }

    return (
      <Link
        to={`/people/${parent.slug}`}
        className={cn({ 'has-text-danger': parent.sex === 'f' })}
      >
        {parent.name}
      </Link>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={cn({ 'has-text-danger': person.sex === 'f' })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? getPersonLink(person.motherName) : '-'}
            </td>
            <td>
              {person.fatherName ? getPersonLink(person.fatherName) : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
