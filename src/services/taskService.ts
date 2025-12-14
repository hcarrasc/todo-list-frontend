import { supabase } from '../lib/supabase';
import type { Task, CreateTaskInput } from '../types/task';

export const getTasks = async (): Promise<Task[]> => {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error al obtener tasks:', error);
        throw error;
    }
    console.log('Fetched tasks:', data);
    return data as Task[];
};

export const createTask = async (input: CreateTaskInput): Promise<Task> => {
    const { data, error } = await supabase
        .from('tasks')
        .insert([
            {
                title: input.title,
                description: input.description,
                status: input.status ?? 'todo',
            },
        ])
        .select()
        .single();

    if (error) {
        console.error('Error creando task:', error);
        throw error;
    }

    return data as Task;
};
