'use client';

import React from 'react';
import { GithubUser } from '@/utils/github/models';
import GithubAvatarListItem from './GithubAvatarListItem';

export default function GithubAvatarList({ users }: { users: GithubUser[] }) {
  return (
    <div className="mt-3">
      <ul className="max-w-4xl mx-auto gap-3 flex flex-wrap items-center">
        {users.map(item => (
          <li
            key={item.id}
            className="flex-none w-5 h-5 hover:scale-105 duration-200 sm:w-8 sm:h-8">
            <GithubAvatarListItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
