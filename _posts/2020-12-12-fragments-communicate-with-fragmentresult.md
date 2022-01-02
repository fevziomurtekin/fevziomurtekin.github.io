---
layout: post
title: Communicate with Fragments with FragmentResult
---

Hello everyone,

In this article, I'll talk about `FragmentResult`, which allow us communicate between fragments.

I'll try to answer question like What is FragmentResult, In what situations should we use it, How to use.

Let's start by explaining what is `FragmentResult`.

## What is FragmentResult?

We've heard Android doesn't support to target (`setTargetFragment()` / `getTargetFragment()`)  recent updates.

Several solutions were offered as an alternative to these structures. One of them is FragmentResult structures.

## In what situations should we use FragmentResult?

You'll communicate between the two fragments, but you don't want use viewmodel or arguments, so `fragmentresult` is for you.

Give you a more detailed example, you can also use situations like in the scenario I'll do and use in a mini application.

> **Scenario**: We've application that use the Navigation Component. In this application, we want to open a dialog in a trailer and change the trailer according to the result from the dialog.

## Usage of FragmentResult

First of all,  I mentioned that I'll use navigation component in the application.

Graph structure I use;

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/nav_graph.xml"
    app:startDestination="@id/homeFragment">

    <fragment
        android:id="@+id/homeFragment"
        android:name="com.fevziomurtekin.myapplication.HomeFragment"
        android:label="fragment_home"
        tools:layout="@layout/fragment_home" />

    <dialog
        android:id="@+id/homeDialog"
        android:name="com.fevziomurtekin.myapplication.HomeDialog"
        android:label="HomeDialog" />
</navigation>
```

As you can see I setup very simple. It consists of just one fragment and dialog.

If we talk about HomeFragment;

```kotlin
class HomeFragment : Fragment() {

    private var tvResult: TextView? = null
    private var btnShowDialog: Button? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? = inflater.inflate(R.layout.fragment_home,container,false)


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        tvResult = view.findViewById(R.id.tv_result)
        btnShowDialog = view.findViewById(R.id.btn_show_dialog)

        // this listen to result.
        parentFragmentManager.setFragmentResultListener(
            REQUEST_KEY,
            this,
            { key, data ->
                if(key == REQUEST_KEY){
                    val result = data.getBoolean("data").let { isAccept->
                        if(isAccept) "Accepted" else "Rejected"
                    }
                    tvResult?.text = result
                }
            }
        )

        // show bottom dialog
        btnShowDialog?.setOnClickListener {
            findNavController().navigate(R.id.homeDialog)
        }

    }
}

```


As you can see in the code above, I'm listening to result returned with `setFragmentResultListener`. The result comes to us as key and bundle data. We handle this too.

If we look at our DialogFragment where this is data is sent.


```kotlin
class HomeDialog : BottomSheetDialogFragment() {

    private var btnAccept: Button? = null
    private var btnReject: Button? = null

    override fun onStart() {
        super.onStart()
        (requireView().parent as? View)?.let { safeView ->
            BottomSheetBehavior.from(safeView).apply {
                state = BottomSheetBehavior.STATE_EXPANDED
                setBottomSheetCallback(object : BottomSheetBehavior.BottomSheetCallback() {
                    override fun onStateChanged(p0: View, p1: Int) {
                        if (p1 == BottomSheetBehavior.STATE_DRAGGING) {
                            state = BottomSheetBehavior.STATE_EXPANDED
                        }
                    }

                    override fun onSlide(p0: View, p1: Float) {}
                })
            }
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? = inflater.inflate(
        R.layout.dialog_home, container, false
    )

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        btnAccept = view.findViewById(R.id.btnAccept)
        btnReject = view.findViewById(R.id.btnReject)
        setListeners()
    }

    private fun setListeners() {
        btnAccept?.setOnClickListener { setResult(true) }
        btnReject?.setOnClickListener { setResult(false) }
    }

    private fun setResult(isAccept: Boolean) {
        parentFragmentManager.setFragmentResult(REQUEST_KEY, bundleOf("data" to isAccept))
        findNavController().popBackStack()
    }

    override fun onCancel(dialog: DialogInterface) {
        super.onCancel(dialog)
        setResult(false)
    }
}

```

In the `setFragmentResult` in the dialog, I send the result returned from the dialog.

## Utilized Resources and Result

- [Offical Docs](https://developer.android.com/guide/fragments/communicate)

You can access the application described in the article from the [link](https://github.com/fevziomurtekin/android-fragment-result).

As seen in our examples, FragmentResult provides us with a very good alternative in communication between fragments with its simple use.

I hope it was useful, and see you in the next articles. 🖐🏼
