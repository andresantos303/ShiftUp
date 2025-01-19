import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';

import Speakers from '@/views/SpeakersView.vue';
import SpeakeridView from '@/views/SpeakeridView.vue';

// Aqui definimos apenas as rotas que queremos testar
const testRoutes = [
  {
    path: '/speakers',
    name: 'speakers',
    component: Speakers,
  },
  {
    path: '/speaker/:id',
    name: 'SpeakerDetails',
    component: SpeakeridView,
    props: true,
  },
];

describe('Rotas de Speakers', () => {
  // Cria um router específico para este teste
  let router;

  beforeEach(() => {
    setActivePinia(createPinia());
    router = createRouter({
      history: createWebHistory(),
      routes: testRoutes,
    });
  });

  it('Renderiza Speakers quando a rota é "/speakers"', async () => {
    // Monta o componente Speakers com esse router
    const wrapper = mount(Speakers, {
      global: {
        plugins: [router],
      },
    });

    // Navega para /speakers
    router.push('/speakers');
    await router.isReady();

    // Verifica se algo específico de Speakers é renderizado
    // (por exemplo, o título "Our Speakers")
    expect(wrapper.text()).toContain('Our Speakers');
  });

  it('Renderiza SpeakeridView quando a rota é "/speaker/:id"', async () => {
    // Monta o componente de detalhes
    const wrapper = mount(SpeakeridView, {
      global: {
        plugins: [router],
      },
    });

    // Navega para /speaker/1
    router.push('/speaker/1');
    await router.isReady();

    // Se o store ainda não carregou, é possível que apareça o texto de "Carregando..."
    // Então podemos verificar esse texto ou outro elemento que aponte que estamos
    // de fato na página de detalhes
    expect(wrapper.text()).toContain('Carregando informações do palestrante...');
  });
});
