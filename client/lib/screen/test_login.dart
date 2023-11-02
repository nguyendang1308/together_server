import 'package:client/bloc/login_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class TestPage extends StatefulWidget {
  const TestPage({super.key});

  @override
  State<TestPage> createState() => _TestPageState();
}

class _TestPageState extends State<TestPage> {
  IO.Socket socket = IO.io('http://192.168.1.38:3000', <String, dynamic>{
    'transports': ['websocket'],
    "autoConnect": true,
  });
  final controller = TextEditingController();
  //Function server controll
  Future<void> serverControll() async {
    final user = context.read<LoginBloc>().state.user;
    print("user: ${user?.id ?? ""}");
    //Connect to server chat
    socket.connect();
    //First emit
    socket.emit("login", user?.id ?? "");
    //Listen server chat after connect
    socket.onConnect((data) {
      socket.on("message", (msg) {
        print(msg);
      });
    });
  }

  //send message

  @override
  void initState() {
    serverControll();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: BlocBuilder<LoginBloc, LoginState>(
            builder: (context, state) {
              return SizedBox(
                width: double.infinity,
                height: double.infinity,
                child: Stack(
                  children: [
                    ListView(
                      children: [
                        Text(state.user?.email ?? "a",
                            style: const TextStyle(color: Colors.black)),
                        const SizedBox(height: 12),
                        Text(state.user?.fullName ?? "a",
                            style: const TextStyle(color: Colors.black)),
                        const SizedBox(height: 12),
                        Text(state.user?.birthday ?? "a",
                            style: const TextStyle(color: Colors.black)),
                        const SizedBox(height: 12),
                        Text(state.user?.gender ?? "a",
                            style: const TextStyle(color: Colors.black)),
                        const SizedBox(height: 12),
                      ],
                    ),
                    Align(
                      alignment: Alignment.bottomCenter,
                      child: TextField(
                        controller: controller,
                        onEditingComplete: () {},
                      ),
                    )
                  ],
                ),
              );
            },
          )),
    );
  }
}
