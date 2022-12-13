import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:opendietary/components/text_bar.dart';
import 'package:opendietary/dialogs/dialog.dart';
import 'package:opendietary/subcomponents/buttons.dart';
import 'package:opendietary/textstyles.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  bool loading = false;

  void login() async {
    try {
      setState(() => loading = true);
      await FirebaseAuth.instance.signInWithEmailAndPassword(
          email: emailController.text, password: passwordController.text);
    } catch (e) {
      if (e.toString().contains("firebase_auth/user-not-found")) {
        dialog(context, 'Error', 'No user found for that email.');
      } else if (e.toString().contains("firebase_auth/wrong-password")) {
        dialog(context, 'Error', 'Wrong password provided for that user.');
      } else if (e.toString().contains("firebase_auth/invalid-email")) {
        dialog(context, 'Error', 'The email address is badly formatted.');
      } else if (e.toString().contains("firebase_auth/too-many-requests")) {
        dialog(context, 'Error', 'Too many requests. Try again later.');
      } else if (e.toString().contains("firebase_auth/network-request-failed")
          || e.toString().contains("firebase_auth/network-request-failed")) {
        dialog(context, 'Error', 'Network error. Check your connection.');
      } else {
        dialog(context, 'Error', 'An unknown error occurred.');
      }
    } finally {
      setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 72.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Text('OPEN DIETARY', style: H1),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 28.0),
                child: Column(children: [
                  Text('Log in with your email and password', style: H4),
                  const SizedBox(height: 12),
                  TextBar(
                    hintText: 'Email',
                    controller: emailController,
                  ),
                  const SizedBox(height: 5),
                  TextBar(
                    hintText: 'Password',
                    obscureText: true,
                    controller: passwordController,
                  ),
                  const SizedBox(height: 25),
                  SizedBox(
                      height: 36,
                      child: loading
                          ? const CircularProgressIndicator()
                          : StandardButton(text: 'Log in', onTap: login))
                ]),
              )
            ],
          ),
        ),
      ),
    );
  }
}
