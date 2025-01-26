import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useUsersStore } from '@/stores/users';

describe('useUsersStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('inicia com participantes pré-definidos', () => {
    const store = useUsersStore();
    expect(store.users).toHaveLength(3);

    // Verifica se um deles é "André Santos", por exemplo
    expect(store.users[0].name).toBe('André Santos');
  });

  it('adiciona um novo participante', () => {
    const store = useUsersStore();

    const newUser = {
      id: 99,
      name: 'Novo User',
      email: 'novo@example.com',
      password: 'abc123',
      age: '30',
      role: 'participant',
      conferences: [],
      ticket: null,
    };

    store.addUser(newUser);
    expect(store.users).toContainEqual(newUser);
  });

  it('remove um user pelo seu id', () => {
    const store = useUsersStore();
    // Garantir que existe um id=1 antes
    expect(store.users.find(u => u.id === 1)).toBeTruthy();

    store.removeUser(1);
    expect(store.users.find(u => u.id === 1)).toBeFalsy();
  });

  it('atualiza um user existente', () => {
    const store = useUsersStore();

    const updatedUser = {
      id: 2,
      name: 'André Costa UPDATE',
      email: 'jehetrolha33@gmail.com',
      password: 'And123',
      age: '21',
      role: 'admin',
    };

    store.updateUser(updatedUser);
    const user = store.users.find(u => u.id === 2);
    expect(user).toBeTruthy();
    expect(user.name).toBe('André Costa UPDATE');
    expect(user.role).toBe('admin');
  });

  it('muda o role de um user', () => {
    const store = useUsersStore();

    store.changeRole(3, 'admin');
    const user3 = store.users.find(u => u.id === 3);
    expect(user3.role).toBe('admin');
  });

  it('adiciona uma conferência a um user', () => {
    const store = useUsersStore();

    store.addConferenceToUser(1, 1);
    const user1 = store.users.find(u => u.id === 1);
    expect(user1.conferences).toContain(1);

    // Testa se não duplica
    store.addConferenceToUser(1, 1);
    expect(user1.conferences).toEqual([1]);
  });

  it('adiciona um bilhete (ticket) a um user', () => {
    const store = useUsersStore();

    store.addTicketToUser(2, 'VIP');
    const user2 = store.users.find(u => u.id === 2);
    expect(user2.ticket).toBe('VIP');
  });

  it('getUserById retorna o user correto', () => {
    const store = useUsersStore();
    const user = store.getUserById(3);
    expect(user).toBeTruthy();
    expect(user.name).toBe('Little John');
  });

  it('getVolunteers retorna apenas users com a role "voluntary"', () => {
    const store = useUsersStore();
    const volunteers = store.getVolunteers;

    expect(volunteers).toHaveLength(1);
    expect(volunteers[0].name).toBe('Little John');
  });
});
