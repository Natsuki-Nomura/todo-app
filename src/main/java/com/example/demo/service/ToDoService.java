package com.example.demo.service;

import com.example.demo.entity.Todo;
import com.example.demo.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository toDoRepository;

    public List<Todo> findAll() {
        return toDoRepository.findAll();
    }

    public Todo save(Todo todo) {
        return toDoRepository.save(todo);
    }

    public void deleteById(Long id) {
        toDoRepository.deleteById(id);
    }

    public Todo update(Long id, Todo updatedTodo) {
        Optional<Todo> existingTodoOpt = toDoRepository.findById(id);
        if (existingTodoOpt.isPresent()) {
            Todo existingTodo = existingTodoOpt.get();
            existingTodo.setTitle(updatedTodo.getTitle());
            existingTodo.setDescription(updatedTodo.getDescription());
            existingTodo.setCompleted(updatedTodo.isCompleted());
            return toDoRepository.save(existingTodo);
        }
        return null;
    }
}