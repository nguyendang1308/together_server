import 'dart:convert';

import 'package:client/bloc/login_bloc.dart';
import 'package:client/constants/api.dart';
import 'package:client/model/friend.dart';
import 'package:client/model/users.dart';
import 'package:client/screen/test_login.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        centerTitle: true,
        title: const Text(
          "Login",
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w500,
            color: Colors.white,
          ),
        ),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          TextFormField(
            controller: emailController,
          ),
          const SizedBox(height: 12),
          TextFormField(
            controller: passwordController,
          ),
          const SizedBox(height: 12),
          BlocConsumer<LoginBloc, LoginState>(
            listener: (context, state) async {
              if (state.user != null) {
                Friend friends = await getFriends(state.user.id);
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => BlocProvider(
                          create: (context) => LoginBloc(),
                          child: TestPage(
                            user: state.user,
                            friend: friends.friends,
                          ),
                        )));
              }
            },
            builder: (context, state) {
              return ElevatedButton(
                onPressed: () {
                  context.read<LoginBloc>().add(LoginEvent(
                      email: emailController.text,
                      password: passwordController.text));
                },
                child: const Text("Login"),
              );
            },
          )
        ],
      ),
    );
  }

  Future<Friend> getFriends(String userId) async {
    try {
      final url = Uri.parse(apiHost + friends);
      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(<String, dynamic>{
          "idUser": userId,
        }),
      );
      if (response.statusCode == 200) {
        return Friend.fromMap(jsonDecode(response.body)["data"]);
      }
      return Friend(friends: []);
    } catch (er) {
      return Friend(friends: []);
    }
  }
}
