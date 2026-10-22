package com.example.demo.service;

import com.example.demo.entity.Todo;
import com.example.demo.entity.User;
import com.example.demo.repository.ToDoRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class ToDoService {

    private final ToDoRepository todoRepository;
    private final UserRepository userRepository;

    public ToDoService(
            ToDoRepository todoRepository,
            UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    // ログイン中のユーザーを取得
    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "ログインしてください"
                ));
    }
    // 自分のToDo一覧を取得
    public List<Todo> findAll(String email) {
        User user = findUser(email);
        return todoRepository.findAllByUser_Id(user.getId());
    }
    // 新しいToDoを、自分のものとして保存
    public Todo save(Todo input, String email) {
        User user = findUser(email);

        Todo todo = new Todo();
        todo.setTitle(input.getTitle());
        todo.setDescription(input.getDescription());
        todo.setCompleted(input.isCompleted());
        todo.setUser(user);

        return todoRepository.save(todo);
    }

    // 自分のToDoを1件取得
    private Todo findMyTodo(Long id, String email) {
        User user = findUser(email);

        return todoRepository.findByIdAndUser_Id(id, user.getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "ToDoが見つかりません"
                ));
    }

    // 自分のToDoを更新
    public Todo update(Long id, Todo input, String email) {
        Todo todo = findMyTodo(id, email);

        todo.setTitle(input.getTitle());
        todo.setDescription(input.getDescription());
        todo.setCompleted(input.isCompleted());

        return todoRepository.save(todo);
    }

    // 自分のToDoを削除
    public void deleteById(Long id, String email) {
        Todo todo = findMyTodo(id, email);
        todoRepository.delete(todo);
    }
}
