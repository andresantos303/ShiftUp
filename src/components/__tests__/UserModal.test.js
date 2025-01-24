import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import UserModal from '@/components/ui/UserModal.vue';

describe('UserModal.vue', () => {
  it('renderiza corretamente em modo de criação ("create")', () => {
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        mode: 'create',
        onClose: vi.fn(),
        onSave: vi.fn(),
      },
    });

    // Verifica se está visível (isOpen: true)
    expect(wrapper.isVisible()).toBe(true);
    // Verifica se o título é "Add User"
    expect(wrapper.find('h2').text()).toBe('Add User');
    // Verifica se o texto do botão de submit é "Create User"
    expect(wrapper.find('button[type="submit"]').text()).toBe('Create User');
  });

  it('preenche os campos ao receber user e modo "edit"', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secret',
      age: 30,
      role: 'admin',
    };

    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        mode: 'edit',
        user: userData,
        onClose: vi.fn(),
        onSave: vi.fn(),
      },
    });

    // Verifica se o título é "Edit User"
    expect(wrapper.find('h2').text()).toBe('Edit User');

    // Agora checamos se os inputs estão preenchidos
    const nameInput = wrapper.find('#name');
    const emailInput = wrapper.find('#email');
    const passwordInput = wrapper.find('#password');
    const ageInput = wrapper.find('#age');
    const roleSelect = wrapper.find('#role');

    expect(nameInput.element.value).toBe('John Doe');
    expect(emailInput.element.value).toBe('john@example.com');
    expect(passwordInput.element.value).toBe('secret');
    expect(ageInput.element.value).toBe('30');
    expect(roleSelect.element.value).toBe('admin');
  });

  it('chama onSave com os dados corretos ao submeter o formulário', async () => {
    const onSaveMock = vi.fn();
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        mode: 'create',
        onClose: vi.fn(),
        onSave: onSaveMock,
      },
    });

    // Preenche alguns campos
    await wrapper.find('#name').setValue('Jane Doe');
    await wrapper.find('#email').setValue('jane@example.com');
    await wrapper.find('#password').setValue('123456');
    await wrapper.find('#age').setValue('22');
    await wrapper.find('#role').setValue('voluntary');

    // Submete o form
    await wrapper.find('form').trigger('submit.prevent');

    // Verifica se onSave foi chamado
    expect(onSaveMock).toHaveBeenCalledOnce();
    // Verifica se foi chamado com os dados corretos
    expect(onSaveMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: '123456',
        age: '22',
        role: 'voluntary',
      })
    );
  });
});
