import 'dart:convert';

import 'package:bloc/bloc.dart';
import 'package:client/constants/api.dart';
import 'package:client/model/users.dart';
import 'package:equatable/equatable.dart';
import 'package:http/http.dart' as http;

part 'login_event.dart';
part 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  LoginBloc() : super(LoginState.initial()) {
    on<LoginEvent>((event, emit) async {
      User? user = await loginAPI(event.email, event.password);
      if (user != null) {
        emit(state.copyWith(user: user));
      }
    });
  }

  Future<User?> loginAPI(String username, String password) async {
    try {
      final url = Uri.parse(apiHost + login);
      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(<String, dynamic>{
          "username": username,
          "password": password,
        }),
      );
      if (response.statusCode == 200) {
        return User.fromMap(jsonDecode(response.body)["data"]);
      }
      return null;
    } catch (er) {
      print("Error $er");
    }
  }
}
