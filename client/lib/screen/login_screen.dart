import 'package:client/bloc/login_bloc.dart';
import 'package:client/screen/test_login.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

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
            listener: (context, state) {
              if (state.user != null) {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => BlocProvider(
                          create: (context) => LoginBloc(),
                          child: const TestPage(),
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
}
