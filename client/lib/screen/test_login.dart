import 'package:client/model/message.dart';
import 'package:client/model/users.dart';
import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class TestPage extends StatefulWidget {
  const TestPage({super.key, required this.user, required this.friend});
  final User user;
  final List<User> friend;
  @override
  State<TestPage> createState() => _TestPageState();
}

class _TestPageState extends State<TestPage> {
  IO.Socket socket = IO.io('http://192.168.1.4:3000', <String, dynamic>{
    'transports': ['websocket'],
    "autoConnect": true,
  });

  List<Message> listMessage = [];

  final controller = TextEditingController();
  //Function server controll
  Future<void> serverControll() async {
    //Connect to server chat
    socket.connect();
    //First emit
    socket.emit("login", widget.user.id);
    //Listen server chat after connect
    socket.onConnect((data) {
      socket.on("message", (msg) {
        print("Other chat: $msg");
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
    final user = widget.user;
    return Scaffold(
      appBar: AppBar(
        title: Text("Test"),
      ),
      body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: SizedBox(
            width: double.infinity,
            height: double.infinity,
            child: Stack(
              children: [
                ListView(
                  children: [
                    Text(user.email,
                        style: const TextStyle(color: Colors.black)),
                    const SizedBox(height: 12),
                    Text(user.fullName,
                        style: const TextStyle(color: Colors.black)),
                    const SizedBox(height: 12),
                    Text(user.birthday,
                        style: const TextStyle(color: Colors.black)),
                    const SizedBox(height: 12),
                    Text(user.gender,
                        style: const TextStyle(color: Colors.black)),
                    const SizedBox(height: 12),
                  ],
                ),
                Align(
                  alignment: Alignment.bottomCenter,
                  child: TextField(
                    controller: controller,
                    onEditingComplete: () {
                      socket.emit("message",
                          {"message": controller.text, "targetId": user.id});
                    },
                  ),
                )
              ],
            ),
          )),
    );
  }
}
