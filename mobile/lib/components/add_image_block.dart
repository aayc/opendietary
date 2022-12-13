// import 'package:flutter/material.dart';
// import 'package:image_cropper/image_cropper.dart';
// import 'package:tiedye/dialogs/dialog.dart';
// import 'package:tiedye/screens/communities/search_unsplash_bottom_sheet.dart';
// import 'package:tiedye/services/storage.dart';
// import 'package:tiedye/subcomponents/bottom_sheet.dart';
// import 'package:tiedye/subcomponents/smart_image_provider.dart';
// import 'package:tiedye/textstyles.dart';

// class AddImageBlock extends StatefulWidget {
//   final String picture;
//   final String label;
//   final Function(String downloadLink) onUploadComplete;

//   const AddImageBlock({required this.picture, required this.onUploadComplete, this.label = ''});
//   @override
//   State<AddImageBlock> createState() => _AddImageBlockState();
// }

// class _AddImageBlockState extends State<AddImageBlock> {
//   bool uploading = false;

//   void _uploadImage() async {
//     setState(() => uploading = true);

//     final rawFile = await pickPhoto();
//     if (rawFile == null) {
//       setState(() => uploading = false);
//       return;
//     }
//     final file = await ImageCropper.cropImage(
//         sourcePath: rawFile.path,
//         androidUiSettings: AndroidUiSettings(
//             toolbarTitle: 'Cropper',
//             toolbarColor: Colors.deepOrange,
//             toolbarWidgetColor: Colors.white),
//         iosUiSettings: IOSUiSettings(
//           aspectRatioLockEnabled: true,
//           minimumAspectRatio: 1.0,
//         ));
//     if (file == null) {
//       setState(() => uploading = false);
//       return;
//     }

//     String? id = await uploadFileFromPath("community", file.path);
//     if (id == null) {
//       dialog(
//           context, "Uh oh!", "We had trouble uploading your profile picture.  Please try again!");
//       return;
//     }
//     String link = await getDownloadUrlFromImageId("community", id);
//     widget.onUploadComplete(link);
//   }

//   void _searchForImage() async {
//     final String? result = await displayCustomBottomSheet(
//         (context, setModalState) => SearchUnsplashBottomSheet(), context,
//         minHeight: 600.0, maxHeight: 600.0, hpad: 0);
//     if (result != null) {
//       widget.onUploadComplete(result);
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     if (widget.picture.isEmpty) {
//       return Container(
//           height: 200,
//           color: Colors.white,
//           child: Center(
//             child: uploading
//                 ? CircularProgressIndicator()
//                 : Column(
//                     mainAxisAlignment: MainAxisAlignment.center,
//                     children: [
//                       if (widget.label.isNotEmpty) Text(widget.label, style: BOLD(H5)),
//                       if (widget.label.isNotEmpty) const SizedBox(height: 12),
//                       Row(mainAxisAlignment: MainAxisAlignment.center, children: [
//                         InkWell(
//                             onTap: _searchForImage,
//                             child: Text('Search',
//                                 style: H5.copyWith(decoration: TextDecoration.underline))),
//                         const SizedBox(width: 5),
//                         Text('or', style: H5),
//                         const SizedBox(width: 5),
//                         InkWell(
//                             onTap: _uploadImage,
//                             child: Text('Upload',
//                                 style: H5.copyWith(decoration: TextDecoration.underline))),
//                       ]),
//                       if (widget.label.isNotEmpty) const SizedBox(height: 20),
//                     ],
//                   ),
//           ));
//     } else {
//       return InkWell(
//         onTap: _searchForImage,
//         child: Container(
//             height: 200,
//             padding: EdgeInsets.symmetric(horizontal: 10),
//             decoration: BoxDecoration(
//                 image:
//                     DecorationImage(image: SmartImageProvider(widget.picture), fit: BoxFit.cover))),
//       );
//     }
//   }
// }
